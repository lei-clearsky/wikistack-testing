var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);


describe('Testing suite capabilities', function () {
  it('confirms basic arithmetic', function () {
    expect(2+2).to.equal(4);
  })
  
  it('checks setTimeout\'s accuracy', function (done) {
    var startTime = new Date();

    setTimeout(function() {
      var diff = new Date() - startTime;
      expect(diff).to.be.closeTo(1000, 20);
      done();
    }, 1000);
  })
  
  it('checks forEach function', function() {
     var arr = [1, 2, 3, 4, 5];
     function printValue (val, id) {
      console.log(id + ':', val);
     }
     var spy = chai.spy(printValue);
     arr.forEach(spy);
     expect(spy).to.have.been.called.exactly(arr.length);
  })
})

