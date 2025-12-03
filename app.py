from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def start():
    return render_template("start.html")

@app.route("/base")
def base():
    return render_template("base.html")

@app.route("/homepage")
def homepage():
    return render_template("homepage.html")

@app.route("/citylist")
def citylist():
    return render_template("citylist.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/about")
def about():
    return render_template("about.html")










if __name__ == "__main__":
    app.run(debug=True)
