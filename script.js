var db={};
$(document).ready(function(){
	$('#addItemBtn').on('click',function(){
		var data={nama:$('#nama').val(),keterangan:$('#keterangan').val()}
		if(data['nama'] in db){
			alert("Nama sudah ada");
			return 0;
		}
		db[$('#nama').val()]=data;
		$('#newItemModal').modal('hide');
		$('#nama').val('');
		$('#keterangan').val('');
		$('#mainTable').append('<tr id="'+data['nama']+'"><td>'+data['nama']+'</td><td>'+data['keterangan']+'</td><td><button data-ref="'+data['nama']+'" class="btn btn-sm btn-info editBtn">Ubah</button> <button data-ref="'+data['nama']+'" class="btn btn-sm btn-danger hapusBtn">Hapus</button></td></tr>')
	});
	$('table').on('click','.hapusBtn',function(){
		$($($(this).parent()).parent()).fadeOut(500);
		delete db[$(this).data('ref')];
	});
	$('table').on('click','.editBtn',function(x){
		var data=db[$(this).data('ref')];
		$('#namaEdit').val(data['nama']);
		$('#keteranganEdit').val(data['keterangan']);
		$('#editItemModal').modal('show');
	});
	$('#saveItemBtn').on('click',function(){
		var data={nama:$('#namaEdit').val(),keterangan:$('#keteranganEdit').val()}
		db[$('#namaEdit').val()]=data;
		$('#editItemModal').modal('hide');
		$('#namaEdit').val('');
		$('#keteranganEdit').val('');
		$('#'+data['nama']).html('<td>'+data['nama']+'</td><td>'+data['keterangan']+'</td><td><button data-ref="'+data['nama']+'" class="btn btn-sm btn-info editBtn">Ubah</button> <button data-ref="'+data['nama']+'" class="btn btn-sm btn-danger hapusBtn">Hapus</button></td>')
	});
});