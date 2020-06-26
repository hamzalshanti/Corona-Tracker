$.getJSON('https://api.covid19api.com/summary', function(data) {
console.log(data);
 
$('h2').html('Global');
$('.total-confirmed').find('span.num').html(formatNumber(data.Global.TotalConfirmed));
$('.total-recovered').find('span.num').html(formatNumber(data.Global.TotalRecovered));
$('.total-deaths').find('span.num').html(formatNumber(data.Global.TotalDeaths));
$('.total-infected').find('span.num').html(formatNumber(data.Global.TotalConfirmed - data.Global.TotalRecovered - data.Global.TotalDeaths));
$('.recovery-rate').find('span.num').html(Math.round((data.Global.TotalRecovered / data.Global.TotalConfirmed) *100));

 for(index in data.Countries){

    $('select').append(`<option value='${index}'>${data.Countries[index].Country}</option>`);
     
 }


$("select").change(function(){
   let position = $(this).val();
    if(position != -1){
    $('h2').html(data.Countries[position].Country);
    $('.total-confirmed').find('span.num').html(formatNumber(data.Countries[position].TotalConfirmed));
    $('.total-recovered').find('span.num').html(formatNumber(data.Countries[position].TotalRecovered));
    $('.total-deaths').find('span.num').html(formatNumber(data.Countries[position].TotalDeaths));
    $('.total-infected').find('span.num').html(formatNumber(data.Countries[position].TotalConfirmed - data.Countries[position].TotalRecovered - data.Countries[position].TotalDeaths));
    $('.recovery-rate').find('span.num').html(Math.round((data.Countries[position].TotalRecovered / data.Countries[position].TotalConfirmed) *100));
}else{
$('h2').html('Global');
$('.total-confirmed').find('span.num').html(formatNumber(data.Global.TotalConfirmed));
$('.total-recovered').find('span.num').html(formatNumber(data.Global.TotalRecovered));
$('.total-deaths').find('span.num').html(formatNumber(data.Global.TotalDeaths));
$('.total-infected').find('span.num').html(formatNumber(data.Global.TotalConfirmed - data.Global.TotalRecovered - data.Global.TotalDeaths));
$('.recovery-rate').find('span.num').html(Math.round((data.Global.TotalRecovered / data.Global.TotalConfirmed) *100));
}
 });

 function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }


let topCun = manualSort([...data.Countries]).slice(0, 5),
    topCunNames = topCun.map(a => a.Country),
    topCunNums = topCun.map(a => a.TotalConfirmed);


function manualSort (arr) {
    let temp;
    for(let i = 0 ; i<arr.length ; ++i){
        for(let j = i+1 ; j<arr.length ; ++j){
            if(arr[i].TotalConfirmed < arr[j].TotalConfirmed){
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}


//start topConfirmed
var topConfirmed = document.getElementById('topConfirmed').getContext('2d');
var confirmedChart = new Chart(topConfirmed, {
    type: 'line',
    data: {
        labels: topCunNames,
        datasets: [{
            label: '# of Confirmed',
            data: topCunNums,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
//end topConfirmed




let topCunRate = recoveredSort([...topCun]).slice(0, 5),
    topCunNamesRate = topCunRate.map(a => a.Country),
    topCunRe = topCunRate.map(a => a.TotalRecovered),
    topCunCon = topCunRate.map(a => a.TotalConfirmed);
    rate = topCunRe.map( function(n, i){ 
        return Math.round((n / topCunCon[i])*100) ; 
    });
    console.log(rate);
    

function recoveredSort(recoverArray) {
    let temp, 
    rateOne,
    rateTwo;
    for(let i = 0 ; i<recoverArray.length ; ++i){
        for(let j = i+1 ; j<recoverArray.length ; ++j){
            rateOne = recoverArray[i].TotalRecovered / recoverArray[i].TotalConfirmed;
            rateTwo = recoverArray[j].TotalRecovered / recoverArray[j].TotalConfirmed;
            if(rateOne < rateTwo){
                temp = recoverArray[i];
                recoverArray[i] = recoverArray[j];
                recoverArray[j] = temp;
            }
        }
    }
    
    
    return recoverArray;
}


//start topRecoverd
var topRecovered = document.getElementById('topRecovered').getContext('2d');
var recoveredChart = new Chart(topRecovered, {
    type: 'doughnut',
    data: {
        labels: topCunNamesRate,
        datasets: [{
            label: '# of Recovered',
            data: rate,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
//end topRecoverd





});

