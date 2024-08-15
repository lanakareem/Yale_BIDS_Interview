from dotenv import load_dotenv
import os

# Load environment variables from the .env file before importing config.py
load_dotenv()

from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from config import Config
import xml.etree.ElementTree as ET

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

#define simple route to send default response:
@app.route('/', methods=['GET'])
def index():
    return "Welcome to the PubMed API"

#DEFINE POST ROUTE
##1) Create endpoint that accepts a query and pagination parameters
##make sure endpoint interacts with PubMed API to fetch publication IDs

@app.route('/api/publications', methods=['POST']) #define new route accepting only POST requests

#fxn to handle request and returning response:
def get_publication_ids():
    data = request.json # retrieve JSON data sent in the request body
    query = data.get('query', '') #query variable used to search publications in PubMed DB
    resultStart = data.get('resultStart', 0)
    resultMax = data.get('resultMax', 10)

    #PubMed API URL:
    url = f"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&resultStart={resultStart}&resultMax={resultMax}&term={query}&retmode=json"

    #API request:
    response = requests.get(url) #send HTTP GET request to the constructed URL using requests library
    result = response.json() #parse JSON content
    print("API Response:", result)

    #Get IDs and return:
    ids = result['esearchresult'].get('idlist', []) #searchresult contains list of publication IDs that match the query
    return jsonify({'ids': ids}) #return JSON response containing list of extracted IDs


#DEFINE GET ROUTE

##endpoint that accepts list of publication IDs and fields to retrieve them
##fetch detailed publication info
@app.route('/api/publications/details', methods=['GET']) #GET request
def get_publication_details():
    ids = request.args.get('ids').split(',') #string of ids split into individual ids
    fields = request.args.get('fields', 'all').split(',') #split string into list of field names

    #PubMed API URL:
    idString = ','.join(ids) #join list of IDs
    url = f"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id={idString}&retmode=xml"

    #API requests:
    response = requests.get(url)
    
    #parse XML response and extract desired fields:
    root = ET.fromstring(response.content) #convert XML string into an ElementTree object
    details = []

    for article in root.findall('.//PubmedArticle'):
        pub_details = {}
        
        #Extract PMID:
        if 'PMID' in fields or 'all' in fields:
            pub_details['PMID'] = article.findtext('.//PMID')
        
        #Extract Title:
        if 'Title' in fields or 'all' in fields:
            pub_details['Title'] = article.findtext('.//ArticleTitle')
        
        #Extract Abstract:
        if 'Abstract' in fields or 'all' in fields:
            pub_details['Abstract'] = article.findtext('.//AbstractText')
        
        #Extract Author List:
        if 'AuthorList' in fields or 'all' in fields:
            authors = [author.findtext('.//LastName') + ' ' + author.findtext('.//ForeName') for author in article.findall('.//Author')]
            pub_details['AuthorList'] = authors
        
        #Extract Journal:
        if 'Journal' in fields or 'all' in fields:
            pub_details['Journal'] = article.findtext('.//Journal//Title')
        
        #Extract Publication Year:
        if 'PublicationYear' in fields or 'all' in fields:
            pub_details['PublicationYear'] = article.findtext('.//PubDate//Year')
        
        #Extract MeSH Terms:
        if 'MeSHTerms' in fields or 'all' in fields:
            mesh_terms = [mesh.findtext('.//DescriptorName') for mesh in article.findall('.//MeshHeading')]
            pub_details['MeSHTerms'] = mesh_terms

        #Handling missing data:
        for key in fields:
            if key not in pub_details and key !='all':
                pub_details[key] = None

        details.append(pub_details)

    #Calculate total pages:
    total_results = len(ids)
    results_per_page = 20
    total_pages = (total_results + results_per_page - 1) // results_per_page

    return jsonify({
        'results': details,
        'totalPages': total_pages
        })

if __name__ == '__main__':
    app.run(debug=True)
