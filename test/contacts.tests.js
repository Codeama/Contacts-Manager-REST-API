const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const config = require('../config')

// Configure chai
chai.use(chaiHttp);
chai.should();
const  fakeContact = { id: 1234, name: 'Admin', birthday: "1990-05-12" };

let token;

const loginDetails = {
    email: `${config.TEST_USER}`,
    password: `${config.TEST_PASSWORD}`
}

before((done) => {
    chai.request(app)
    .post('/authenticate')
    .send(loginDetails)
    .end((err, response) => {
        token = response.body.token; // save the token!
        done();
    });
});

describe("Contacts", () => {
    describe("GET /contacts", () => {
        // Test to get all contacts
        it("should get all contacts", (done) => {
             chai.request(app)
                 .get('/contacts')
                 .set({"authorization": token})
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.should.be.json;
                     res.body.should.be.a('object');
                     res.body.should.have.property('payload');
                     done();
                  });
         });

         // Test to get single contact
        it("should return a 404", (done) => {
            chai.request(app)
                .get(`/contacts/${fakeContact.id}`)
                .set({"authorization": token})
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.should.be.json;
                    done();
                 });
        });
        });
         
})
