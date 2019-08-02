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
    isNumberInRange(range, number){
        if(range[0] - number <=1 && number - range[1] <=1){
            return true;
        }
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
    
    /**
     * Removes a range from the list
     */
    remove(range) {
        function removeFromList(list,index, one,two){
            list.splice(index, 1);
            let count = 0;
                if(one){
                    list.splice(index,0,one);
                    count+=1;
                } 
                if(two){
                    list.splice(index,0,two);
                }
        }
        for (let index = 0; index < this.list.length; index++) {
            var old_range = this.list[index];
            if(range[0] >= old_range[0] && range[0] <= old_range[1]) {
                if (range[0] != old_range[0]){
                    var one = [old_range[0], range[0]-1];
                }
                if(range[1] < old_range[1]){
                    var two = [range[1]+1, old_range[1]];
                }
                removeFromList(this.list,index,one,two);
            }
            
            else if (range[1] >= old_range[0] && range[1] < old_range[1]){
                var one = [range[1] +1, old_range[1]]
                removeFromList(this.list,index,one,null);
            }
            else if(range[0] < old_range[0] &&range[1] >= old_range[1]){
                this.list.splice(index, 1);
                index--;
            }
        }
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
// Example
  const r = new Ranges();
  r.add([1, 4]);
  r.print();
  // Should display: [1, 4]
  r.add([10, 20]);
  r.print();
  // Should display: [1, 4] [10, 20]
  r.add([10, 10]);
  r.print();
  // Should display: [1, 4] [10, 20]
  r.add([21, 21]);
   
  r.print();
  // Should display: [1, 4] [10, 21]
  r.add([2, 4]);
  r.print();
// Should display: [1, 4] [10, 21]
  r.add([3, 8]);
  r.print();
//Should display: [1, 8] [10, 21]

//  console.log("remove...")
  r.remove([10, 10]);
  r.print();
// Should display: [1, 8] [11, 21]
  r.remove([10, 11]);
  r.print();
// Should display: [1, 8] [12, 21]
  r.remove([15, 17]);
  r.print();
// Should display: [1, 8] [12, 14] [18, 21]
  r.remove([3, 19]);
  r.print();
// Should display: [1, 2] [20, 21]

