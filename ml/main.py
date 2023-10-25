from flask import Flask, request, jsonify
import requests
import pandas as pd
import numpy as np
from flask_cors import CORS, cross_origin
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

app = Flask(__name__)

CORS(app, origins="*")



@app.route('/ml/getRestaurants', methods=['POST'])
def post_endpoint1():
    # Get the JSON data from the request
    data = request.get_json()
    # Process the data (You can customize this logic)
    result = {"message": "Received data", "data": data}
    print(data['city'])
    response = requests.post('http://localhost:4000/customer/allRestaurants',{"city":data['city']})
    if response.status_code == 200:
        response = [{'_id': '652f70b4e91a5f14261fac0b', 'email': 'priyanshshah2442@gmail.com', 'password': '123456', 
            'name': 'PRIYANSH SHAH', 'location_url': 'google.map.com', 'sitting_capacity': 100, 'range': '', 
            'thumbnail_url': 'https://res.cloudinary.com/dedenmpd7/image/upload/v1697607851/tnmqn9vjfmnicbdymq0v.avif', 
            'images_urls': ['https://res.cloudinary.com/dedenmpd7/image/upload/v1697607856/kbomfnijd7nt0zptmnxu.avif'],
            'total_tables': {'tableSize': [], 'noOfTables': []}, 'occupied_tables': {'tableSize': [], 'noOfTables': []}, 
            'phone': 6353159433, 'city': 'Vadodara', 'rating': 4.1, 'ratingCount':1, '__v': 0, 'refresh_token': ''},
                    {'_id': '6530cb258f10a116e116382a', 'email': 'hns@gmail.com', 'password': '123456', 'name': 'Easy Dining', 'location_url': 'google.com', 'sitting_capacity': 100, 'range': 'Medium','thumbnail_url': 'https://res.cloudinary.com/dedenmpd7/image/upload/v1697696541/rp0u1kjzmqrgbnyivvnc.jpg', 'images_urls': ['https://res.cloudinary.com/dedenmpd7/image/upload/v1697696546/ke4klkig333grgz76lhc.jpg', 'https://res.cloudinary.com/dedenmpd7/image/upload/v1697696546/uqp7cfulr401uzyzusg4.jpg', 'https://res.cloudinary.com/dedenmpd7/image/upload/v1697696546/tpknzvm57kguapz9aekz.jpg', 'https://res.cloudinary.com/dedenmpd7/image/upload/v1697696546/tkxhmxs6pn7xdiv3t8ho.jpg', 'https://res.cloudinary.com/dedenmpd7/image/upload/v1697696546/jynyns0w3n2ucxiofpln.jpg'], 'total_tables': {'tableSize': [], 'noOfTables': []}, 'occupied_tables': {'tableSize': [], 'noOfTables': []}, 'phone': 9601613653, 'city': 'Vadodara', 'rating': 2.5, 'ratingCount':1, '__v': 0, 'refresh_token': ''}]

        df = pd.DataFrame(response)

        df_sorted = df.sort_values(by=['rating'],ascending=[False])

        # print(df_sorted)

        # Specify the output Excel file path
        excel_file_path = "data.xlsx"
        id_arr = df_sorted['_id'].tolist()
        print(id_arr)
        return jsonify({'data':id_arr})
    else:
        return jsonify({"error": "Failed to fetch data from the other API"})

@app.route('/ml/getTopRestaurants', methods=['POST'])
def post_endpoint2():
    data = request.get_json()
    response = requests.post('http://localhost:4000/customer/allRestaurants')
    if response.status_code == 200:
        resp = response.json()
        df = pd.DataFrame(resp)
        if data.get('city','')!='':
            df2 = df[df['city']==data['city']]
        else:
            df2 = df
        df2_sorted = df2.sort_values(by=['rating'],ascending=[False])
        arr = []
        for i in df2_sorted.index:
            d = dict()
            for title in df2_sorted:
                d[title] = str(df[title][i])
            del d['password']
            arr.append(d)
        # print(arr)
        return jsonify({'list':arr})
        # return arr
    else:
        return jsonify({"error": "Failed to fetch data from the other API"})


  
@app.route('/ml/getRestaurantsBySearch', methods=['POST'])
def post_endpoint3():
    data = request.get_json()
    print(data)
    response = requests.post('http://localhost:4000/customer/allMenu')
    if response.status_code == 200:
        resp = response.json()
        # print(resp)
        rest_list = []
        if data.get('type')=='Cuisine':
            for m in resp:
                for c in m['menu']:
                    if c['name'].lower().find(data.get('search','').lower())!=-1:
                        if m['restaurant'] not in rest_list:
                            rest_list.append(m['restaurant'])
                            break
        else:
            for m in resp:
                for c in m['menu']:
                    for i in c['items']:
                        if i['Name'].lower().find(data.get('search','').lower())!=-1 or i['Description'].lower().find(data.get('search','').lower())!=-1:
                            if m['restaurant'] not in rest_list:
                                rest_list.append(m['restaurant'])
        # print(rest_list)
        response2 = requests.post('http://localhost:4000/customer/allRestaurants')
        if response2.status_code == 200:
            resp2 = response2.json()
            df = pd.DataFrame(resp2)
            if data.get('city','')!='':
                df2 = df[df['city']==data['city']]
            else:
                df2 = df
            df2 = df2[df2['_id'].isin(rest_list)]
            # print(df2)
            df2_sorted = df2.sort_values(by=['rating'],ascending=[False])
            print(len(df2_sorted))
            arr = []
            for i in df2_sorted.index:
                d = dict()
                for title in df2_sorted:
                    d[title] = str(df[title][i])
                del d['password']
                arr.append(d)
            # print(arr)
            return jsonify({'list':arr})
        else:
            return jsonify({"error": "Failed to fetch data from the other API"})
    else:
        return jsonify({"error": "Failed to fetch data from the other API"})
    
@app.route('/ml/likedRestaurants', methods=['POST'])
def post_endpoint4():
    data = request.get_json()
    response = requests.post('http://localhost:4000/customer/allRestaurants')
    if response.status_code == 200:
        resp = response.json()
        df = pd.DataFrame(resp)
        if data.get('city','')!='':
            df2 = df[df['city']==data['city']]
        else:
            df2 = df
        df2_sorted = df2.sort_values(by=['rating'],ascending=[False])
        arr = []
        for i in df2_sorted.index:
            d = dict()
            for title in df2_sorted:
                d[title] = str(df[title][i])
            del d['password']
            arr.append(d)
        # print(arr)
        return jsonify({'list':arr})
        # return arr
    else:
        return jsonify({"error": "Failed to fetch data from the other API"})

@app.route('/ml/similarRestaurants', methods=['POST'])
def post_endpoint5():
    data = request.get_json()
    response = requests.post('http://localhost:4000/customer/getVisited',{'phone':data.get('phone','')})
    if response.status_code == 200:
        resp1 = response.json()
        # print(resp1)
        last_visited = resp1[-1]['rid']
        # print(last_visited)

        response2 = requests.post('http://localhost:4000/customer/allRestaurants')
        resp2 = response2.json()

        df = pd.DataFrame(resp2)
        last_visited_index = df[df['_id']==last_visited].index

        df2 = df.loc[:,['_id','sitting_capacity','range','city','rating','ratingCount']]
        # print(df2)
        city_mapping = {city: label for label, city in enumerate(df['city'].unique(), 1)}
        df2['city'] = df2['city'].map(city_mapping)

        df2['range'].fillna('Budget Friendly', inplace=True)
        range_mapping = {num: label for label, num in enumerate(df['range'].unique(), 1)}
        df2['range'] = df2['range'].map(range_mapping)

        cosine_sim = cosine_similarity(df2.loc[:,['sitting_capacity','range','city','rating','ratingCount']])
        # print(cosine_sim)
        df['similarity'] = cosine_sim[last_visited_index][0]
        df = df.sort_values(by=['similarity'],ascending=[False])
        df = df[df['city']==data.get('city','')]
        # print(df)

        arr_index = df.index
        # print(arr_index)
        arr = []
        for i in arr_index:
            d = dict()
            for title in df:
                d[title] = str(df[title][i])
            del d['password']
            arr.append(d)
        # print(arr)
        return jsonify({'list':arr})
        # return arr
    else:
        return jsonify({"error": "Failed to fetch data from the other API"})
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
