
var api = {
    getExerciseInfo() {
        var url = `https://wger.de/api/v2/exercise/?language=2`;
       // var url = `https://trackapi.nutritionix.com/v2/natural/nutrients/x-app-id=53f90ff5&x-app-key=db5d3524e467eac8227c4edfef9b3847`
        //curl "https://api.edamam.com/search?q=chicken&app_id=${7f285649}&app_key=${ea8581ab11a307273e4aef55b77e605d}&from=0&to=3&calories=591-722&health=alcohol-free"

    }
}

export const nutritionApi = ({ uri }) => {
    uri = 'https://api.nutritionix.com/v2/';
    fetch(uri, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-app-id':'53f90ff5',
          'x-app-key': 'db5d3524e467eac8227c4edfef9b3847'
            
        }
      }).then((response) => console.log(response.json()))
      .catch((error) => console.log(error.message));
};
