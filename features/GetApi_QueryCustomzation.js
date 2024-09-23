//  we will be doing some customization to docs( .find() ) based on the req.query 
module.exports = class GetApi_QueryCustomization {
    constructor(query,queryString){
        this.query = query,
        this.queryString = queryString
    }

    filter(){
        //  let queryObj = this.queryString does't work ??????????/
        let queryObj = {...this.queryString}

        const excude = ['page','perPage','sort','field']
        excude.forEach(el=> delete queryObj[el] )

        // working with advanced queries like [gt],[lt],[gte],[lte]
        // 127.0.0.1:4040/api/league?field=leagueName,countryName & price[gt] = 200 & people[lte] = 100 

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match=> `$${match}`)

        // then filter it by this new  query str
        this.query =  this.query.find(JSON.parse(queryStr))
        //  return 'this' so that you can chain other methods to the first one's result
        return this

    }

    sort(){
        if (this.queryString.sort) {
            // incase there are many sort params join them by space
            const sortBy = this.queryString.sort.split(",").join(" ")
            this.query =  this.query.sort(sortBy)
        }else{ this.query.sort('-createdAt')}
        return this
    }

    selectFields(){
        if (this.queryString.field) {
            const fields = this.queryString.field.split(",").join(" ")
            this.query.select(fields)
        }
        return this
    }
    pagination(){
        const page = parseInt(this.queryString.page) || 1  // if page is 0 it will be changed to 1
        const perPage = parseInt(this.queryString.perPage) || 1000  // if no limit specified will get not all but the first 10
        const skip = (page - 1 ) * perPage

        // then skip 'skip' docs and give me 'limit' docs
        this.query.skip(skip).limit(perPage)

        return this
    }


}
