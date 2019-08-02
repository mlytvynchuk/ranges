 // Task: Implement a class named 'Ranges'
// Example of a range [1, 4] - includes integers: 1, 2, 3, and 4.
// Example of a list: [1, 4], [109, 206], [400, 600]
class Ranges {
    
    constructor(){
        this.list = [];
    }
    /**
     * Adds a range to the list
     */
    checkForRanges(){
        for (let i = 0; i < this.list.length; i++) {
            var el = this.list[i];
            for (let j = 0; j < this.list.length; j++) {
                if (this.isCooperation(this.list[j], el)) {
                    if(this.list[i] != this.list[j] && this.list[j][0] >= el[0] && this.list[j][1] <= el[1]){
                        this.list[j][1] = this.list[i][1];
                        this.list.splice(i, 1);
                    }
                }
                
            }
            
        }
    }
    add(range) {
      if(this.list.length > 0){
        let isCreateNew = true;
        for (let i = 0; i < this.list.length; i++) {
            var element = this.list[i];
            if(this.isCooperation(range,element)){
                if(range[0]<=element[0] && range[1] >= element[1]){
                    this.list.splice(i,1);
                    this.list.push(range);
                    i = 0;
                    element = this.list[i];
                }
                if(range[0] < element[0] && this.isNumberInRange(element, range[1])){
                    element[0] = range[0];
                }
                if(range[1] > element[1]){
                    element[1] = range[1];
                }
                
                range = element;
                if(this.list[i-1] && this.list[i-1][0] === range[0]){
                    this.list.splice(i-1, 1);
                }
                isCreateNew = false;

            }
        }

        if(isCreateNew === true){
            this.list.push(range);
        }
        this.checkForRanges();
      }
      else{
        this.list.push(range);
      }
    }
    isConstistAll(range, element){
        if(range[0] >= element[0] && range[1] <= element[1]){
            return true;
        }
        return false;
    }
    isNumberInRange(range, number){
        if(range[0] - number <=1 && number - range[1] <=1){
            return true;
        }
        return false;
    }
    isNumberInStrictRange(range, number){
        console.log(range, number);
        if (range[0] && range[1]){}
        // if(number >= range[0] && number <= range[1]){
        //     return true;
        // }
        return false;
    }
    isCooperation(range, element){
        // range - new element
        // element - old element
        if((range[0] - element[1] <=1 || (range[0]>=element[0] && range[0] <= element[1])) && range[1] >= element[1] ){

            return true;
        }
        else if(this.isNumberInRange(element, range[1]) && range[0] <= element[0]){ 
            return true;
        }
        else if (range[0] >= element[0] && range[1] <= element[1]){
            return true;
        }
        return false;
    }
    
    removeAndChangeEl(index, values){
        this.list.splice(index, 1);
        values.map(el => {
            this.list.push(el);
        })
    }
    /**
     * Removes a range from the list
     */
    remove(range) {
        
        let ourNewRanges = [];
        for (let i = 0; i < this.list.length; i++) {
            // range from our list
            var element = this.list[i];
            console.log(range[0],element)
            if(range[0] <= element[0] && range[1] >= element[1]){
                
                this.list.splice(i,1);
                element = this.list[i];
            }
            if (range[0] >= element[0] && range[1] <= element[1]){
                if(range[0] != element[0]){
                    ourNewRanges.push([element[0],range[0]-1]);
                    this.removeAndChangeEl(i, ourNewRanges);
                }
                if(range[0] != range[1]){
                    ourNewRanges.push([range[1]+1, element[1]]);
                    this.removeAndChangeEl(i, ourNewRanges);
                }
                    console.log("new ranges",ourNewRanges)
                    
            }
            // if(this.isNumberInStrictRange(element, range[0]) && this.isNumberInStrictRange(element, range[1])){
            //         if(range[0] != element[0]){
            //             ourNewRanges.push([element[0],range[0]-1]);
            //         }
            //         ourNewRanges.push([range[1]+1, element[1]]);
            //         this.removeAndChangeEl(i, ourNewRanges);
            // }
            if(element[1] >= range[1] && element[0] <= range[1]){

                element[0] = range[1]+1;
            }
            else if(this.isNumberInStrictRange(element, range[0])){
                element[1] = range[0]-1;
            }
        }
        r.print();
    }
    /**
     * Prints out the list of ranges
     */
    print() {
        this.list.sort(function(a,b){
            return a[0] - b[0];
        })
        console.log(this.list);
  } }
//   // Example
  const r = new Ranges();
//   r.add([1, 4]);
//   r.print();
//   // Should display: [1, 4]
//   r.add([10, 20]);
//   r.print();
//   // Should display: [1, 4] [10, 20]
//   r.add([10, 10]);
//   r.print();
//   // Should display: [1, 4] [10, 20]
//   r.add([21, 21]);
   
//   r.print();
//   // Should display: [1, 4] [10, 21]
//   r.add([2, 4]);
//   r.print();
// //   // Should display: [1, 4] [10, 21]
//   r.add([3, 8]);
//   r.print();
// //   //Should display: [1, 8] [10, 21]

//  console.log("remove...")
//   r.remove([10, 10]);
//   r.print();
// //   // Should display: [1, 8] [11, 21]
//   r.remove([10, 11]);
//   r.print();
// //   // Should display: [1, 8] [12, 21]
//   r.remove([15, 17]);
//   r.print();
// //   // Should display: [1, 8] [12, 14] [18, 21]
//   r.remove([3, 19]);
//   r.print();
// //   // Should display: [1, 2] [20, 21]

r.add([1,10]);
r.add([20,20])
r.print()
r.add([11,19])
// r.remove([5,20])
r.print()


