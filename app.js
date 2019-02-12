const stocksList = ['FB', 'SNAP', 'GOOG'];

const stocks = $("#stocks")

function createStockButtons(){
 stocks.empty();
  for (let i=0; i<stocksList.length; i++){
   stocks.append(`<button class="stock">${stocksList[i]}</button>`)

  }
}

createStockButtons();

$("#submit").click(function(){
   var stockCode = $("#stocksInput").val();
  stocksList.push(stockCode);
  createStockButtons();

})

$(document).on('click', '.stock', function(){
   
   var stock = $(this).text();
   $.get(`https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,news&range=1m&last=1`, function(data){
     console.log(data);
     $('#content').empty()
     $('#content').append(
      `
       <div>${data.quote.symbol}</div>
       <div>${data.quote.companyName}</div>
       <div>${data.quote.latestPrice}</div>
       <div><a href=${data.news[0].url}>${"Click here for a recent news article related to this company!"}</a></div>
      `
     )
   })
})

