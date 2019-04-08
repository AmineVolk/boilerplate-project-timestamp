var request = require("supertest");
var expect = require("chai").expect;

var host = "http://localhost:3100";

describe("test timestamp endpoint", () => {
  it("Should return error json for invalid date", done => {
    request(`${host}/api/timestamp`)
      .get("/invalidDate")
      .expect(200)
      .expect(res => {
        expect(res.body).deep.equal({ unix: null, utc: "Invalid Date" });
      })
      .end(done);
  });
  it("Should return date for valid string date", done => {
    request(`${host}/api/timestamp`)
      .get("/2015-12-25")
      .expect(200)
      .expect(res => {
        expect(res.body).deep.equal({
          unix: 1451001600000,
          utc: "Fri, 25 Dec 2015 00:00:00 GMT"
        });
      })
      .end(done);
  });

  it("Should return date when passing millseconds", done => {
    request(`${host}/api/timestamp`)
      .get("/1451001600000")
      .expect(200)
      .expect(res => {
        expect(res.body).deep.equal({
          unix: 1451001600000,
          utc: "Fri, 25 Dec 2015 00:00:00 GMT"
        });
      })
      .end(done);
  });
  it("Should return current date for empty string", done => {
    request(`${host}/api/timestamp`)
      .get("/")
      .expect(200)
      .end(done);
  });
});
