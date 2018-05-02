describe("MongoDB", function() {
    it("is there a server running", function(next) {
        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect('mongodb://admin:admin@ds014578.mlab.com:14578/mylittleshop', function(err, db) {
            expect(err).toBe(null);
            next();
        });
    });
});
