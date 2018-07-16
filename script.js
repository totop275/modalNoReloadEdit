// membuat variabel untuk menampung data
var db={};
// dengan $(document).ready() akan membuat script didalamnya dijalankan setelah semua dokumen siap
$(document).ready(function(){
	// dibawah ini adalah mendengarkan dari tombol dengan id="addItemBtn", tombol tambahkan di modal barang baru
	$('#addItemBtn').on('click',function(){
		// membangun data dari input di model
		var data={nama:$('#nama').val(),keterangan:$('#keterangan').val()}
		// mengencek apakah data sudah ada di db
		if(data['nama'] in db){
			// jika ada, keluar alert
			alert("Nama sudah ada");
			return 0;
		}
		// jika tidak ada, menambahkan data ke db
		db[$('#nama').val()]=data;
		// menutup modal
		$('#newItemModal').modal('hide');
		// set input nama menjadi kosong lagi
		$('#nama').val('');
		// set input keterangan menjadi kosong lagi
		$('#keterangan').val('');
		// menambahkan barang baru ke tampilan tabel
		$('#mainTable').append('<tr id="'+data['nama']+'"><td>'+data['nama']+'</td><td>'+data['keterangan']+'</td><td><button data-ref="'+data['nama']+'" class="btn btn-sm btn-info editBtn">Ubah</button> <button data-ref="'+data['nama']+'" class="btn btn-sm btn-danger hapusBtn">Hapus</button></td></tr>')
	});
	// ini mendengarkan tombol class="hapusBtn" , tombol hapus
	$('table').on('click','.hapusBtn',function(){
		// mengambil parent dari parent tombol, yaitu button >> td >> tr, dan menghilangkannya dari tampilan
		$($($(this).parent()).parent()).fadeOut(500);
		// menghapus data dari db
		delete db[$(this).data('ref')];
	});
	// ini mendengarkan tombol class="editBtn", tombol Ubah
	$('table').on('click','.editBtn',function(x){
		// mengambil data dari db item dari tombol
		var data=db[$(this).data('ref')];
		// mengisi input dengan data dri db
		$('#namaEdit').val(data['nama']);
		$('#keteranganEdit').val(data['keterangan']);
		// menampilkan modal
		$('#editItemModal').modal('show');
	});
	//ini mendengarkan tombol simpan di modal edit barang
	$('#saveItemBtn').on('click',function(){
		// membangun data dari input di modal
		var data={nama:$('#namaEdit').val(),keterangan:$('#keteranganEdit').val()}
		// memperbarui data lama dengan data yang baru dibangun
		db[$('#namaEdit').val()]=data;
		// menyembunyikan modal
		$('#editItemModal').modal('hide');
		// mengosongkan input
		$('#namaEdit').val('');
		$('#keteranganEdit').val('');
		// memperbarui tampilan tabel
		$('#'+data['nama']).html('<td>'+data['nama']+'</td><td>'+data['keterangan']+'</td><td><button data-ref="'+data['nama']+'" class="btn btn-sm btn-info editBtn">Ubah</button> <button data-ref="'+data['nama']+'" class="btn btn-sm btn-danger hapusBtn">Hapus</button></td>')
	});
});