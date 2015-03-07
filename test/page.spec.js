var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
var Page = require('../models/').Page;
describe('Page Model', function() {
    describe('Validations', function() {
      var page;
      beforeEach(function() {
        page = new Page();
      });

      xit('should err without title', function() {})
      xit('should err with title of zero length', function() {})
      xit('should err without body', function() {})
    })

    describe('Statics', function() {
        describe('findBytag', function() {
            xit('should get pages with the search tag', function() {})
            xit('should not get pages without the search tag', function() {})
        })
    })

    describe('Methods', function() {
        describe('computeUrlName', function() {
            xit('should convert non-word-like chars to underscores', function() {})
        })
        describe('getSimilar', function() {
            xit('should never get itself', function() {})
            xit('should get other pages with any common tags', function() {})
            xit('should not get other pages without any common tags', function() {})
        })
    })

    describe('Virtuals', function() {
        describe('full_route', function() {
            xit('should return the url_name prepended by "/wiki/"', function() {})
        })
    })

    describe('Hooks', function() {
        xit('should call computeUrlName before save', function() {})
    })

})
