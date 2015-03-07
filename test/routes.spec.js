var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);
var models = require('../models');

describe('http requests', function() {

    describe('GET /', function() {
        it('should get 200 on index', function(done) {
          agent
              .get('/')
              .expect(200, done);
        })
    })

    describe('GET /wiki/:title', function() {
        it('should get 404 on page that doesnt exist', function(done) {
          agent
              .get('/penguin')
              .expect(404, done)
        })
        it('should get 200 on page that does exist', function(done) {
          agent
          .get('/wiki/Star_Trek_film')
          .expect(200, done)
        })
    })

    describe('GET /wiki/tags/:tag', function() {
        it('should get 200', function(done) {
        agent
          .get('/wiki/tags/film')
          .expect(200,done)
        })
    })

    describe('GET /wiki/:title/similar', function() {
        it('should get 404 for page that doesn\'t exist', function(done) {

          agent
            .get('/wiki/lei_movie_3/similar')
            .expect(404, done)
 
         
        })
      
      it('should get 200 for similar page', function(done) {
      
          agent
            .get('/wiki/lei_movie_2/similar')
            .expect(200, done)
 

      })
    })

    describe('GET /wiki/:title/edit', function() {
        it('should get 404 for page that doesn\'t exist', function(done) {
        
        agent
          .get('/wiki/lei_movie_3/edit')
          .expect(404,done)

        })
        
      
      
      it('should get 200 for similar page', function(done) {
      
        agent.get('/wiki/lei_movie_2/edit')
        .expect(200,done)

      })
    })

    describe('GET /add', function() {
        it('should get 200', function(done) {
          agent
              .get('/add')
              .expect(200, done)
        })
    })

    describe('POST /wiki/:title/edit', function() {
        it('should get 404 for page that doesn\'t exist', function(done) {
          agent
        .post('/wiki/lei_movie_3/edit')
        .expect(404, done)  
        })
        it('should update db', function(done) {
        
        
          var newPage = new models.Page({'title': 'lei_movie_3'}); 
          newPage.save(function (err, page) {
           
            agent
            .post('/wiki/lei_movie_3/edit')
            .expect(200, done)

          });
                   //function(res, req, next){



        //  }

        })
    })

    describe('POST /add/submit', function() {
        xit('should create in db', function() {})
    })

})
