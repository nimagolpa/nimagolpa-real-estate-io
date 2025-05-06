console.log('main.js loaded');

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded');
  var typeFilter = document.getElementById('typeFilter');
  var transFilter = document.getElementById('transFilter');
  var grid = document.getElementById('propertyGrid');

  if (!grid) {
    console.error('propertyGrid element not found');
    return;
  }
  if (!typeFilter) console.error('typeFilter element not found');
  if (!transFilter) console.error('transFilter element not found');

  // تولید ۲۰ ملک
  var properties = [];
  var types = ['apartment', 'villa', 'land', 'commercial'];
  var transactions = ['buy', 'rent'];
  var locations = ['جردن', 'لواسان', 'کرج', 'ولیعصر', 'زعفرانیه', 'کردان'];

  for (var i = 0; i < 20; i++) {
    var type = types[i % types.length];
    var transaction = transactions[i % transactions.length];
    var location = locations[i % locations.length];
    var base = type === 'apartment' ? 'آپارتمان' :
               type === 'villa'     ? 'ویلا'      :
               type === 'land'      ? 'زمین'     : 'مغازه';
    properties.push({
      title: base + ' ' + (i+1) + ' در ' + location,
      price: (5 + i) + ' میلیارد',
      type: type,
      transaction: transaction,
      img: 'https://via.placeholder.com/400x250?text=' + encodeURIComponent(base + ' ' + (i+1)),
      detailUrl: 'property.html'
    });
  }

  // رندر کارت‌ها
  function render() {
    grid.innerHTML = '';
    properties.forEach(function(p) {
      var card = document.createElement('div');
      card.className = 'property-card';
      card.dataset.type = p.type;
      card.dataset.transaction = p.transaction;

      var html = '';
      html += '<img src="' + p.img + '" alt="' + p.title + '">';
      html += '<div class="card-content">';
      html += '<h4>' + p.title + '</h4>';
      html += '<p>' + p.price + '</p>';
      html += '<a href="' + p.detailUrl + '" class="btn small">جزئیات</a>';
      html += '</div>';
      card.innerHTML = html;
      grid.appendChild(card);
    });
  }

  // فیلتر کردن
  function filterProps() {
    var tVal = typeFilter ? typeFilter.value : 'all';
    var trVal = transFilter ? transFilter.value : 'all';
    document.querySelectorAll('.property-card').forEach(function(c) {
      var okType = (tVal === 'all' || c.dataset.type === tVal);
      var okTrans = (trVal === 'all' || c.dataset.transaction === trVal);
      c.style.display = (okType && okTrans) ? '' : 'none';
    });
  }

  render();

  if (typeFilter) typeFilter.addEventListener('change', filterProps);
  if (transFilter) transFilter.addEventListener('change', filterProps);

  filterProps();
});
