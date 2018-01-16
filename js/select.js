
const url = 'http://wifi.abcpos.com/helper/ajax/portalmanager';

// fetch all function
function fetchAll() {
  $.post(url,{get: 'portals' }, function(data) {
    // console.log(data);
    $.each(data, function(){
      $('#selector').append($('<option/>').val(this.portalid).text(this.name));
    });
  },"json");
}

// fetch all data on page load
$(function() {
  fetchAll();
});

// fetch data from selected id
function fetchId(id) {
  $.post(url,{get: 'portal_info', portal_id: id}, function(data) {
    console.log(data);
    $('#dir-name').val(data.name);
    $('#title-name').val(data.title);
    $('#bg-name').val(data.background);
    $('#logo-name').val(data.logo);
    $('#landing-name').val(data.landingPage);
  },"json");
}

$('#selector').change(function(){
  // console.log(this.value);
  if($('#selector').val() > -1)
    fetchId(this.value);
  else {
    $('#dir-name').val('');
    $('#title-name').val('');
    $('#bg-name').val('');
    $('#logo-name').val('');
    $('#landing-name').val('');
  }
})

// post data to sql
function postId(name, title, background, logo, landingpage) {
  $.post(url,
    {
      set: 'portal',
      name: name,
      background: background,
      logo: logo,
      landingpage: landingpage,
      portal_id: 5,
      title: title
    },
    function(name,background,logo,landingpage,portal_id,title) {
      console.log(name);
    },"json");
}

$('#save-btn').click(function() {
  let name = $('#dir-name').val();
  let title = $('#title-name').val();
  let background = $('#bg-name').val();
  let logo = $('#logo-name').val();
  let landingpage = $('#landing-name').val();
  postId(name, title, background, logo, landingpage);
});
