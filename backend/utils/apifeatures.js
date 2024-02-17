class ApiFeatures{
    // queryStr is anything after ? in the Url 
    // query is things like .find, .findbyId 
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    // Search 
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            },
        } : {}
        
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };
        
        //Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach(key => delete queryCopy[key]);

        // Filter for price range products 
        let quertStr = JSON.stringify(queryCopy);
        // regular expression to get greater than, greater than equals to , less than, less than equals to
        // and replce it with a dollar sign in front, so that we can query whenever needed

        quertStr = quertStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(quertStr));
        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        // if we are at 3rd page and there are 10 products per page, then we need to skip 20 products
        const skip = resultPerPage * (currentPage - 1);

        // .limit() limits the number of result products of query 
        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;