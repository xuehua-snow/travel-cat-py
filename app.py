from flask import Flask, render_template, request,redirect,session,jsonify
from dotenv import load_dotenv
import os
import mysql.connector

load_dotenv()

app = Flask(__name__) 

app.secret_key = os.getenv('SECRET_KEY')
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')
app.config['MYSQL_PORT'] = os.getenv('MYSQL_PORT')


# def get_db():
#     return mysql.connector.connect(
#         host=app.config['MYSQL_HOST'],
#         user=app.config['MYSQL_USER'],
#         password=app.config['MYSQL_PASSWORD'],
#         database=app.config['MYSQL_DB']
#     )

def get_db():
    return mysql.connector.connect(
        host=app.config['MYSQL_HOST'],
        port=int(app.config.get('MYSQL_PORT', 3306)),
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        database=app.config['MYSQL_DB'],
        ssl_disabled=False
    )

# --------------------------route-------------------------------
@app.route("/")
def start():
    return render_template("start.html")

@app.route("/homepage")
def homepage():
    return render_template("homepage.html")

@app.route("/cityslist")
def cityslist():
    return render_template("cityslist.html")

@app.route("/about")
def about():
    return render_template("about.html")

# --------------------------city route-------------------------------
@app.route("/cityslist/toronto")
def toronto():
    # --------------SQL----------------
    conn = get_db()
    cursor = conn.cursor(dictionary=True)

    if "user_id" in session:
        userid = session["user_id"]
        city = "toronto"

        note_sql = '''
                        SELECT content,id
                        FROM note
                        WHERE user_id = %s AND city = %s;
                    '''
        note_values = (userid, city)
        
        cursor.execute(note_sql, note_values)
        note = cursor.fetchall()
    else:
        note = []

    cursor.close()
    conn.close()
    # ----------SQL End----------------  

    return render_template("cities/toronto.html", note=note)

@app.route("/cityslist/seulo")
def seulo():
    # --------------SQL----------------
    conn = get_db()
    cursor = conn.cursor(dictionary=True)

    if "user_id" in session:
        userid = session["user_id"]
        city = "seulo"
    
        note_sql = '''
                        SELECT content,id
                        FROM note
                        WHERE user_id = %s AND city = %s;
                    '''
        note_values = (userid, city)
        
        cursor.execute(note_sql, note_values)
        note = cursor.fetchall()
    else:
        note = set()

    cursor.close()
    conn.close()
    # ----------SQL End----------------  

    return render_template("cities/seulo.html",note=note)

@app.route("/cityslist/paris")
def paris():
    # --------------SQL----------------
    conn = get_db()
    cursor = conn.cursor(dictionary=True)

    if "user_id" in session:
        userid = session["user_id"]
        city = "paris"
    
        note_sql = '''
                        SELECT content,id
                        FROM note
                        WHERE user_id = %s AND city = %s;
                    '''
        note_values = (userid, city)
        
        cursor.execute(note_sql, note_values)
        note = cursor.fetchall()
    else:
        note = set()

    cursor.close()
    conn.close()
    # ----------SQL End---------------- 

    return render_template("cities/paris.html",note=note)
# -----------------------------form page------------------------------------
# ------------------search city form---------------------
# No city found page
@app.route("/no")
def no():
    return render_template("/form/nocity.html")

# Search city form 
@app.route("/searchcity", methods=["POST"])
def searchcity():
    search = request.form.get('search').strip()
    search_lower = search.lower()

    city_list = ["toronto","seulo","paris"]   # 全部小写存储

    if search_lower in city_list:
        return redirect(f"/cityslist/{search_lower}")

    else:
        return render_template("form/nocity.html", search=search)

# ----------------------sign up form---------------------
@app.route('/signup', methods=['POST'])
def signup():

    username = request.form.get('username')
    password = request.form.get('password')

    # --------------SQL----------------
    conn = get_db()
    cursor = conn.cursor(dictionary=True)

    signup_sql = '''
                   INSERT INTO `users` (username,password)
                   VALUES (%s, %s)
                   '''
    signup_values = (username,password)

    try:
        cursor.execute(signup_sql, signup_values)
        conn.commit()
    except mysql.connector.Error as e:
        print(e)
    
    cursor.close()
    conn.close()
    # ----------SQL End----------------

    return redirect("/")

# --------------------------login form-------------------------
@app.route('/login', methods=['POST'])
def login():

    username = request.form.get('logusername')
    password = request.form.get('logpassword')

    # --------------SQL----------------
    conn = get_db()
    cursor = conn.cursor(dictionary=True)

    login_sql = '''
                    SELECT id, password, admin
                    FROM users
                    WHERE username = %s;
                '''
    login_values = (username,)

    cursor.execute(login_sql, login_values)
    currentUser = cursor.fetchone()

    cursor.close()
    conn.close()
    # ----------SQL End----------------

    if currentUser == None:
        return "No"
    else:
        if password != currentUser["password"]:
            return "wrong"
        else:
            session["user_id"] = currentUser["id"]
            session["username"] = username
            session["logged_in"] = True

            return username

# --------------------------log out form-------------------------
@app.route('/logout', methods=['POST'])
def logout():

    session.clear()

    return redirect("/")

# --------------------------Add Note-------------------------
@app.route('/addnote', methods=['POST'])
def addnote():
    content = request.form.get('content')
    city = request.form.get('city')
    country = request.form.get('country')
    user_id = session["user_id"]

    # --------------SQL----------------
    conn = get_db()
    cursor = conn.cursor(dictionary=True)

    addnote_sql = '''
                   INSERT INTO `note` (user_id,city,country,content)
                   VALUES (%s, %s,%s,%s)
                   '''
    addnote_values = (user_id,city,country,content)

    try:
        cursor.execute(addnote_sql, addnote_values)
        conn.commit()
    except mysql.connector.Error as e:
        print(e)
    
    cursor.close()
    conn.close()
    # ----------SQL End----------------

    return redirect(request.referrer or '/')

# --------------------------Edit Note-------------------------
@app.route('/editnote', methods=['POST'])
def editnote():
    content = request.form.get('content')
    city = request.form.get('city')
    note_id = request.form.get('note_id')
    user_id = session["user_id"]
    

    # --------------SQL----------------
    conn = get_db()
    cursor = conn.cursor(dictionary=True)

    editnote_sql = '''
                   UPDATE `note` 
                   SET `content` = %s
                   WHERE id = %s AND user_id = %s AND city = %s;
                   '''
    editnote_values = (content,note_id,user_id, city)
    print('VALUES:', editnote_values)
    try:
        cursor.execute(editnote_sql, editnote_values)
        print('ROWCOUNT:', cursor.rowcount)
        conn.commit()
        print('EDIT NOTE CALLED')
    except mysql.connector.Error as e:
        print(e)
    
    cursor.close()
    conn.close()
    # ----------SQL End----------------

    return redirect(request.referrer or '/')




if __name__ == "__main__":
    app.run(debug=True)
