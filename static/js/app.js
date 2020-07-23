const url = '././samples.json'
 

function initialize(){

  var initDropdown = d3.selectAll('#selDataset')

  d3.json(url).then(function(data) {
  
  
   console.log((data));

   data.names.forEach(function(id) {
     initDropdown.append('option').text(id).property('value');  
   });


   var dataset = data.names[0]
   var values = (data.samples[0].sample_values)
   var ids = (data.samples[0].otu_ids)
   var labels = (data.samples[0].otu_labels)
  //  var meta = data.metadata[0]

  var metaid = data.metadata[0].id
  var metaEth = data.metadata[0].ethnicity
  var metaGender = data.metadata[0].gender
  var metaAge = data.metadata[0].age
  var metaLoc = data.metadata[0].location
  var metaBbtype = data.metadata[0].bbtype
  var metaFreq = data.metadata[0].wfreq

  buildPlot(dataset, values, ids, labels, metaid, metaEth, metaGender, metaAge, metaLoc, metaBbtype, metaFreq)

  })

}





// d3.selectAll('#selDataset').on('change');             


function optionChanged() {
  var dropdownMenu = d3.select('#selDataset')
  var dataset = dropdownMenu.property('value')

  console.log(`Selected dataset is: ${dataset}`)

  d3.json(url).then(function(data) {
      console.log(`Reading data for ${dataset}`)
      console.log(data.metadata[0])
      

      //get sample data from data.samples
      var i
      for (i=0; i<data.samples.length; i++) {
        if (data.samples[i].id === dataset) {
          var index = i
          // console.log(`Found record for id at ${index}`)
          // console.log(`sample values for ${dataset} are: ${data.samples[i].sample_values}`)  
          // console.log(`OTU Ids for ${dataset} are: ${data.samples[i].otu_ids}`)
          // console.log(`OTU labels for ${dataset} are: ${data.samples[i].otu_labels}`)  
         
          //grab sample data
          var values = (data.samples[i].sample_values)
          var ids = (data.samples[i].otu_ids)
          var labels = (data.samples[i].otu_labels)

          //grab metadata
          var metaid = data.metadata[i].id
          var metaEth = data.metadata[i].ethnicity
          var metaGender = data.metadata[i].gender
          var metaAge = data.metadata[i].age
          var metaLoc = data.metadata[i].location
          var metaBbtype = data.metadata[i].bbtype
          var metaFreq = data.metadata[i].wfreq

          // console.log(`The values variable is ${values}`)
          // console.log(`The id variable is ${ids}`)
          // console.log(`The labels variable is ${labels}`)

        }
      }


          
      //   }
      // }
      console.log(`the meta id is ${metaid}`)
      buildPlot(dataset, values, ids, labels, metaid, metaEth, metaGender, metaAge, metaLoc, metaBbtype, metaFreq)

  });

  

}




function buildPlot(dataset, values, ids, labels, metaid, metaEth, metaGender, metaAge, metaLoc, metaBbtype, metaFreq) {
  
  console.log('Building plot')



  //Build bar chart

  var trace1 = {
    type: 'bar',
    orientation: 'h',
    x: values.slice(0,10),
    y: ids.slice(0,10),
    text: labels.slice(0,10)
  };

  var data1 = [trace1];

  var layout1 = {
    title: `Top bacteria for ${dataset}`,
    yaxis: {
      tickprefix: 'OTU '
     
      
    }
  };

  Plotly.newPlot('bar', data1, layout1)

  //build bubble chart

  var trace2 = {
    x: ids,
    y: values,
    mode: 'markers',
    text: labels,
    marker: {
      color: ids,
      size: values
    }
  }

  var data2 = [trace2];

  var layout2 = {
    title: `All bacteria for ${dataset}`,
    xaxis: {
      title: 'OTU IDs'
    }
  };

  Plotly.newPlot('bubble', data2, layout2)


  //display metadata

  var jsonstr = `<ul><li>ID: ${metaid}</li><li>Ethnicity: ${metaEth}</li><li>Gender: ${metaGender}</li><li>Age: ${metaAge}</li><li>Location: ${metaLoc}</li><li>bbtype: ${metaBbtype}  </li><li>wfreq: ${metaFreq}  </li></ul>`;
  document.getElementById('sample-metadata').innerHTML = jsonstr;

}

 



initialize()

const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);     