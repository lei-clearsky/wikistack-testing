var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
var Page = require('../models/').Page;
//var chai-things = require('chai-things');
chai.should();
chai.use(require('chai-things'));

describe('Page Model', function() {
    describe('Validations', function() {
      var page;
      
      beforeEach(function() {
        page = new Page();
      });
      
      it('should err without title', function() {
        page = new Page({'body': 'test', 'url_name': 'test'});
        page.validate(function (err) {
          expect(err.errors).to.have.property('title');
        });
      })
      it('should err with title of zero length', function() {
        page = new Page({'title': '', 'body': 'test', 'url_name': 'test'});
         expect(page.title.length > 0, 'title is not empty');
      })
      it('should err without body', function() {
        page = new Page({'url_name': 'test'});
        page.validate(function (err) {
          expect(err.errors).to.have.property('body');
        });

      })
    })

    describe('Statics', function() {
      beforeEach(function(done) {
          Page.create({
              title: 'foo',
              body: 'bar',
              tags: ['foo', 'bar']
          }, done )
      }) 

       describe('findBytag', function() {
        /*
            it('should get pages with the search tag', function() {
              //page = new Page({'title': 'animals', 'body': 'dogs cats...', 'tags': ['dog', 'cat']});
              expect(Page.findByTag('dog') == !null);
            })
            it('should not get pages without the search tag', function() {
               expect(Page.findByTag('dog') == null);
          
            })
        */

      it('should get pages with the search tag', function(done) {
          Page.findByTag('bar', function(err, pages) {
              expect(pages).to.have.lengthOf(1)
              done()
          })
      })

      it('should not get pages without the search tag', function(done) {
          Page.findByTag('falafel', function(err, pages) {
              expect(pages).to.have.lengthOf(0)
              done()
          })
      })
   })
})

    describe('Methods', function() {
        describe('computeUrlName', function() {
            it('should convert non-word-like chars to underscores', function(){
              page = new Page({'title': 'test hello'});
              page.computeUrlName();
              expect(page.url_name).to.equal('test_hello'); 
            })
        })
        describe('getSimilar', function() {
           var page1 = new Page({'title': 'test similar 1', 'tags': ['dog', 'cat']});
           var page2 = new Page({'title': 'test similar 2', 'tags': ['dog']});
           var page3 = new Page({'title': 'test similar 3', 'tags': ['penguin', 'seal']});
            it('should never get itself', function() {
              page1.getSimilar(function(pages) {
                pages.should.not.include({'title':'test similar 1' });
              });
            
            })
            it('should get other pages with any common tags', function() {
             page1.getSimilar(function(pages) {
                pages.should.include({'title':'test similar 2' });
              });

            })
            it('should not get other pages without any common tags', function() {
              page1.getSimilar(function(pages) {
                pages.should.not.include({'title':'test similar 3' });
              });
 
            })
        })
    })

    describe('Virtuals', function() {
        describe('full_route', function() {
            it('should return the url_name prepended by "/wiki/"', function() {
              page = new Page({'title':'hello lei'});
              page.computeUrlName();
              expect(page.full_route).to.equal('/wiki/hello_lei');

            })
        })
    })

    describe('Hooks', function() {
        it('should call computeUrlName before save', function() {
     page = new Page ({'title': 'hellolei'});

      var spy = chai.spy(page.computeUrlName);
      page.computeUrlName = spy;
      page.computeUrlName();

      expect(spy).to.have.been.called.exactly(1);      
        
        })
    })

})
