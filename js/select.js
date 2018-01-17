
const url = 'http://wifi.abcpos.com/helper/ajax/portalmanager';

// fetch all data on load
function fetchAll() {
  $.post(url,{get: 'portals' }, function(data) {
    // console.log(data);
    $.each(data, function(){
      $('#selector').append($('<option/>').val(this.portalid).text(this.name));
    });
  },"json");
}

$(function() {
  fetchAll();
});

// fetch portal_id
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
  if($('#selector').val() > -1) {
    fetchId(this.value);
    $('#delete-btn').addClass('show');
  }
  else {
    $('#dir-name').val('');
    $('#title-name').val('');
    $('#bg-name').val('');
    $('#logo-name').val('');
    $('#landing-name').val('');
    $('#delete-btn').removeClass('show');
  }
})

// create new portal
function postId(name, title, background, logo, landingpage) {
  $.post(url,
    {
      set: 'portal',
      name: name,
      background: background,
      logo: logo,
      landingpage: landingpage,
      // portal_id: 6,
      title: title
    },
    function(data) {
      console.log(data);
    },"json");
}

$('#save-btn').click(function() {
  let portal_id = $('#selector').val();
  let name = $('#dir-name').val();
  let title = $('#title-name').val();
  let background = $('#bg-name').val();
  let logo = $('#logo-name').val();
  let landingpage = $('#landing-name').val();
  if(portal_id == -1){
    postId(name, title, background, logo, landingpage);
    location.reload();
  } else if (portal_id > 0 && portal_id != '') {
      updateId(name, title, background, logo, landingpage, portal_id);
      location.reload();
    } else {
      console.log('do nothing');
    }
});

// delete portal id
function deleteId(portal_id) {
  $.post(url,
    {
      set: 'delete',
      portal_id: portal_id
    },function(data) {
      console.log(data);
    })
}

$('#delete-btn').click(function() {
  let portal_id = $('#selector').val();
  if (portal_id > 0) {
    deleteId(portal_id);
    location.reload();
  }
  else {
    console.log('No portal_id selected');
  }
});

//update portal_id
function updateId(name, title, background, logo, landingpage, portal_id){
  $.post(url, {
    set: 'portal',
    name: name,
    title: title,
    background: background,
    landinpage: landingpage,
    logo: logo,
    portal_id: portal_id
  }, function(data) {
    console.log(data);
  }, "json");
}

// $('#update-btn').click(function() {
//   let portal_id = $('#selector').val();
//   let name = $('#dir-name').val();
//   let title = $('#title-name').val();
//   let background = $('#bg-name').val();
//   let logo = $('#logo-name').val();
//   let landingpage = $('#landing-name').val();
//   if (portal_id > 0 && portal_id != '') {
//     updateId(name, title, background, logo, landingpage, portal_id);
//     location.reload();
//   } else {
//     console.log('do nothing');
//   }
// });
