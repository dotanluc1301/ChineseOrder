const { TAG_NAME_IS_NULL,
        TAG_NAME_IS_NUMBER,
        TAG_NAME_IS_EXCEED_MAXLENGTH,
        TAG_ID_IS_EXCEED_MAXLENGTH,
        TAG_ID_IS_NULL,
        TAG_ID_IS_NUMBER} = require('../src/constant/errorMessage')
const router = require('../src/routers/tag');
const request = require('supertest');
const express = require('express');
const app = express();

describe('tag', function() {
  beforeEach(()=>{
    app.use(express.urlencoded({extended: false}));
    app.use('/',router);
  })
  it('should return all tag',function(done) {
    request(app).get('/')
                .then(function (res) {
                  expect(res.body).not.toBeNull();
                  expect(res.body.data.length).toBeGreaterThan(0);
                  
                  res.body.data.forEach(element => {
                    expect(element.id).not.toBeNull();
                    expect(element.document.name).not.toBeNull();
                  });

                  expect(res.body.status).toBe('OK.');
                  expect(res.body.error).toBe('');
                  done();
                });
  })
  it('should return gloves detail',function(done) {
    request(app).get('/gloves')
                .then(function (res) {
                  expect(res.body).not.toBeNull();
                  expect(res.body.data.length).toBeGreaterThan(0);
                  
                  res.body.data.forEach(element => {
                    expect(element.id).not.toBeNull();
                    expect(element.document.name).not.toBeNull();
                    expect(element.document.name).toBe('gloves');
                  });

                  expect(res.body.status).toBe('OK.');
                  expect(res.body.error).toBe('');
                  done();
                });
  })
  it('should return gloves detail',function(done) {
    request(app).get('/1')
                .then(function (res) {
                  expect(res.body).not.toBeNull();
                  expect(res.body.data.length).toBeNull();
                  
                  

                  expect(res.body.status).toBe('OK.');
                  expect(res.body.error).toBe('');
                  done();
                });
  })
})