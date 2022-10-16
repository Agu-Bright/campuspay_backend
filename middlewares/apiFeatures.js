class ApiFeatures {
  constructor(query, queryStr) {
    (this.query = query) /**Books.find() */,
      (this.queryStr = queryStr) /**req.query */;
  }
  // ==> /api/v1/books?search=Phsycology
  // queryStr = {search: "Phsycology"}
  search = () => {
    const search = this.queryStr.search
      ? {
          //search the books by name
          name: {
            $regex: this.queryStr.search,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...search });
    return this;
  };

  //filter by price ==> /api/v1/books?search=Phsycology&price[gte]=2000
  filter = () => {
    //queryStr = {search:"Phsycology", limit: 4, page: 1, category: "Engineering", price: [gte: 1], price:[lte: 1000], rating: [get: 3] }
    const queryCopy = { ...this.queryStr };

    //removing fields from the array
    const removeField = ["search", "limit", "page"];
    removeField.forEach((field) => delete queryCopy[field]);

    //advance filter form price, rating,location etc
    let queryStr = JSON.stringify(queryCopy); // price: [gte: 1], price:[lte: 1000], rating: [get: 3]
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr)); //find({price: [gte: 20]})
    return this;
  };

  paginate = (resPerpage) => {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerpage * (currentPage - 1);
    this.query = this.query.limit(resPerpage).skip(skip);
    return this;
  };
}

module.exports = ApiFeatures;
