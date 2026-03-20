
class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        if (this.queryStr.keyword) {
            this.query = this.query.find({
                ProductName: { $regex: this.queryStr.keyword, $options: 'i' }
            });
            console.log("kya mila ", this.queryStr.keyword)
        }
        return this;
    }



    filter() {
        const queryCopy = { ...this.queryStr };

        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);

        console.log("object dddd", queryCopy)

        // Handle multiple category IDs (in case of a comma-separated string)

        if (queryCopy.ProductsCategoriesMappings) {
            queryCopy.ProductsCategoriesMappings = {
                $in: queryCopy.ProductsCategoriesMappings.split(',')
            };
        }
        



        // if (queryCopy.ProductsCategoriesMappings) {
        //     queryCopy.ProductsCategoriesMappings = {
        //         $in: queryCopy.ProductsCategoriesMappings.split(',').map(id => id.trim())  // Make sure to trim any extra spaces
        //     };
        // }

        // Handle multiple manufacturers (Menufacturs)
        if (queryCopy.Menufacturs) {
            queryCopy.Menufacturs = {
                $in: queryCopy.Menufacturs.split(',')
            };
        }
        // Handle multiple manufacturers (Menufacturs)
        if (queryCopy.ProductSize) {
            queryCopy.ProductSize = {
                $in: queryCopy.ProductSize.split(',')
            };
        }

        // Handle price filtering (both gte and lte)
        if (queryCopy.Price) {
            let priceFilter = {};

            // If Price has gte, apply greater than or equal filter
            if (queryCopy.Price['gte']) {
                priceFilter['$gte'] = queryCopy.Price['gte'];
            }

            if (queryCopy.Price['lte']) {
                priceFilter['$lte'] = queryCopy.Price['lte'];
            }

            if (Object.keys(priceFilter).length > 0) {
                queryCopy.Price = priceFilter;
            }
        }

        // if (queryCopy.ReviewRating) {
        //     // Handle the case where ReviewRating is specified
        //     queryCopy.ProductReviews = { 
        //         "$elemMatch": { 
        //             "ReviewRating": { "$in": queryCopy.ReviewRating.split(",").map(rating => Number(rating)) }
        //         }
        //     };
        //     delete queryCopy.ReviewRating; // Remove the ReviewRating filter after use
        // }
        if (queryCopy["ProductReviews.ReviewRating"]) {
            const reviewRatings = queryCopy["ProductReviews.ReviewRating"].split(',').map(rating => Number(rating));

            queryCopy.ProductReviews = {
                $elemMatch: {
                    ReviewRating: { $in: reviewRatings }
                }
            };

            delete queryCopy["ProductReviews.ReviewRating"];  // Remove the ReviewRating filter after use
        }

        // const hasFilters = Object.keys(queryCopy).length > 0;
        // if (hasFilters) {
        //     // If filters exist, remove the OrderByColumnName from the query
        //     delete queryCopy.OrderByColumnName;
        // }

        // if (this.selectedValue) {
        //     const [field, direction] = this.selectedValue.split(' '); // e.g. "Price ASC"
        //     const sortDirection = direction === 'ASC' ? 1 : -1;

        //     console.log("Sorting direction: ", sortDirection); // Debugging the sort direction

        //     // Apply sorting to the query (by price or date)
        //     if (field === "Price") {
        //         this.query = this.query.sort({ Price: sortDirection });
        //         console.log("Query after Price sorting: ", this.query);
        //     } else if (field === "Date") {
        //         this.query = this.query.sort({ Date: sortDirection });
        //         console.log("Query after Date sorting: ", this.query);
        //     }
        // }

        // Final query string
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `${key}`);

        console.log("Final Query: ", queryStr); // Check final query

        this.query = this.query.find(JSON.parse(queryStr));
        console.log("Filtered Query: ", queryCopy);

        return this;
    }

    pagination(resultPerPage) {

        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures