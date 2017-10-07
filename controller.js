var bcrypt = require("bcrypt-nodejs")
var nodemailer = require('nodemailer');
//Le login et le mot de passe sont identiques
var loginData = [
    { login: "stone", pwd: "$2a$06$LbeRlSfysZCiwJrdIwb.Y.gTA4zG5ELgCI/y7uMlezpnwsq7MN9/e", mail: "stivynho@live.fr" },
    { login: "pito", pwd: "$2a$06$jjo2dhQN5jv5el8dt9IIEupKiS0olNnLSEBDPKgffmpc7SsK3ZHUK", mail: "stivynho@live.fr" },
    { login: "homer", pwd: "$2a$06$ev.wlQ6sH0gk1/gC2DvFDeVoSUULJiVSO6hjp23p0SFFT5TBFkdNy", mail: "stivynho@live.fr" },
    { login: "tadson", pwd: "$2a$06$Aq427oy6njSpnzbawUnUUO.CKZFxwFvLkXs8xK5DblOvYD/htWjZ2", mail: "stivynho@live.fr" },
    { login: "hermes", pwd: "$2a$06$D8fwC/SoJArnpKOWvwagSuJqsOfy/wD5nccLx/.SNuK1z8R6XYcRi", mail: "stivynho@live.fr" },
    { login: "maiwenn", pwd: "$2a$06$KZJI9dYYhzyZdaceH9dVROPxMKYQTO2ofZ0p2GO9ecmN/KXkb0tLm", mail: "stivynho@live.fr" },
    { login: "promesse", pwd: "$2a$06$fQlRCrIlI7mjyUQ0OXPIW.CawcrtLsfdo9WmV1bgGhLlcCfF1rJRa", mail: "stivynho@live.fr" },
    { login: "beldie", pwd: "$2a$06$2G9fLz3/iYpnHX2kKQ7hNeBex9pcdCCZKdXr8tn8sZcpoqcjxbun2", mail: "stivynho@live.fr" },
    { login: "morgane", pwd: "$2a$06$2elvrLL3HseZR4.Nuwwp/eq04Qzgu/MrCjpkDTRfJVn6P9eYFTCwW", mail: "stivynho@live.fr" },
    { login: "elaurane", pwd: "$2a$06$iAbeQddou.i1cnnhzjVJ7et3HrrcNR5Lb/SSMoLZDOpAskklWHcdi", mail: "stivynho@live.fr" },
    { login: "clement", pwd: "$2a$06$tTFcAjTKLyh5dDGbaNBoNOJ29lmWCSJanCex56XKm17qb0SPaU2TK", mail: "stivynho@live.fr" }
]

var homeData = {
    "paris": [
        { name: "Grand appartement", surface: 112, address: "8 Av de l\'Elysée, 75008 Paris, France", price: 15 },
    ],
    "new-york": [
        { name: "Appart", surface: 23, address: " W 47th St, New York, NY 10036, États-Unis", price: 68 },
    ],
    "bruxelles": [
        { name: "Private BedRoom wit Tv", surface: 50, address: "Rue du Chapelain 8, Kapelaanstraat 8, 1070 Bruxelles, Belgique", price: 13 },
    ],
    "londres": [
        { name: "Light  Spacious Garden Flat London", surface: 75, address: "Marylebone Rd, Marylebone, London NW1 5LR, Royaume-Uni", price: 71 },
    ],
    "berlin": [
        { name: "Big room in Berlin Mitte", surface: 23, address: "Olympischer Pl. 3, 14053 Berlin, Allemagne", price: 32 },
    ],
    "barcelone": [
        { name: "Great home", surface: 23, address: "Carrer de Balmes, 60, 08007 Barcelona, Espagne", price: 45 },
        { name: "Pensio Apolo", surface: 33, address: "Carrer de Balmes, 60, 08007 Barcelona, Espagne", price: 55 },
        { name: "Barcelona city centre", surface: 13, address: "Carrer de Balmes, 60, 08007 Barcelona, Espagne", price: 35 },
    ],
}

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'stivynho95@gmail.com',
        pass: 'Hermes94'
    }
});


module.exports = {
    getApp: function (req, res) {
        res.send('<h1>Please sign in</h1> <br><form method="GET" action="/login"><p><label>Login</label> : <input type="text" name="login" /></p> <br> <p><label>Password</label> : <input type="password" name="pwd" /></p> <input type="submit" value="Submit" /></form>')
    },
    chat: function(req, res) {
        res.sendFile('index.html', {root: './app/'}, function(err) {
            if (err) sendJSONError(response, 'Erreur server angular app');
        });
    },
    login: function (req, res) {
        var login = req.query.login;
        var pwd = req.query.pwd;
        if (!login || !pwd) {
            res.send('<h1>Password or ogin missing</h1>')
            return
        } else {
            var accountExist = false;
            loginData.forEach(function (element) {
                if (element.login == login && bcrypt.compareSync(pwd, element.pwd)) accountExist = true;
            })
            if (accountExist) {
                res.send('<h1>Welcome ' + login + '!!!! Happy to see you</h1> <br> <a href="/chat">Would you chat about airbnb?</a><br><h3>Where do you want to go ????</h3> <form method="GET" action="/search"><p><label>City</label> : <input type="text" name="city" /></p><input type="submit" value="Go" /></form> ')
                return
            } else {
                res.send('<h1 style="color: red">Invalid Credentials')
            }
        }
    },
    search: function (req, res) {
        var city = req.query.city;
        if (!city && !homeData.hasOwnProperty(city.toLowerCase())) {
            res.send('<h1>City is missing</h1>')
            return
        } else { 
            var liste = '<ul>'
            homeData[city].forEach(function(element){
                liste += '<form method="POST" action="/sendEmail?mail=stivynho@live.fr&address='+element.address+'&name='+element.name+'"><li> Nom : '+element.name+', address : '+element.address+', surface : '+element.surface+', price : '+element.price+'€ <input type="submit" value="Book" /></form>';
            })
            liste+= '</ul>'
            res.send('<h1>Voici les resultats pour '+city+'</h1> <br> '+liste)
            return
        }
        res.send('<h1>Search</h1> <br>')

    },
    sendMessage: function (req, res) {
        res.send('<h1>sendMessage</h1>')

    },
    sendEmail: function (req, res) {
        var mailOptions = {
            from: '"Tadson airbnb  👻" <stivynho95@gmail.com', // sender address
            to: req.query.mail, // list of receivers
            subject: 'Booking  #8039551093 ✔', // Subject line
            text: 'Thank you, stone! Your reservation in '+req.query.name+' at '+req.query.address+' is now confirmed. ', // plain text body
            html: '<b>Thank you, stone! Your reservation in '+req.query.name+' at '+req.query.address+' is now confirmed. </b>' // html body
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                return console.log(error);
            }
            console.log('message envoyé')
            res.status(200)
            res.send(JSON.stringify({ message: "Message sent"}))
        });
        
    },
    updateInfos: function (req, res) {
        res.send('<h1>updateInfos</h1>')

    },
}