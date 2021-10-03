const addValue = document.querySelector('#addValue');
const addBtn = document.querySelector('#addBtn');
const myList = document.querySelector('#myList');
const clearBtn = document.querySelector('#clearBtn');
let listArray = [];

// 偵測並列印 Local Storage
function PrintList() {
	let localStorageData = localStorage.getItem('NewData');

	if (localStorageData != null) {
		listArray = JSON.parse(localStorageData);

		let newList = '';
		listArray.forEach (function (element, index) {
			newList += `
			<li>
				<span>${element}</span>
				<input value="${element}" style="display: none;">
				<button class="edit" onclick="editList(${index})"></button>
				<button class="done" onclick="editDone(${index})" style="display: none;"></button>
				<button class="del" onclick="delList(${index})"></button>
			</li>
			`
		})
		myList.innerHTML = newList;
		addValue.value = '';
	}
	console.log(listArray);
}

// addBtn事件
function getData() {
	// 若input有值
	if (addValue.value != '') {
		let localStorageData = localStorage.getItem('NewData');

		if (localStorageData == null) {
			listArray = [];
		} else {
			listArray = JSON.parse(localStorageData);
		}

		listArray.push(addValue.value);
		localStorage.setItem('NewData', JSON.stringify(listArray));
		
		PrintList();
	}
}
// 鍵盤Enter事件
document.addEventListener('keydown', event => {
 	if (event.key === 'Enter') {
 		document.querySelector('#addBtn').click();
 	}
})

// 編輯資料
function editList(index) {
	let valueShow = event.target.previousElementSibling.previousElementSibling;
	let editInput = event.target.previousElementSibling;
	let editBtn = event.target;
	let doneBtn = event.target.nextElementSibling;

	editBtn.style.display = 'none';
	valueShow.style.display = 'none';
	doneBtn.style.display = 'inline';
	editInput.style.display = 'inline';

	let localStorageData = localStorage.getItem('NewData');
	listArray = JSON.parse(localStorageData);
	editValue = listArray[index];
}

// 送出編輯
function editDone(index) {
	let valueShow = event.target.previousElementSibling.previousElementSibling.previousElementSibling;
	let editInput = event.target.previousElementSibling.previousElementSibling;
	let editBtn = event.target.previousElementSibling;
	let doneBtn = event.target;

	editBtn.style.display = 'inline';
	valueShow.style.display = 'inline';
	doneBtn.style.display = 'none';
	editInput.style.display = 'none';

	let localStorageData = localStorage.getItem('NewData');
	listArray = JSON.parse(localStorageData);
	listArray.splice(index, 1, editInput.value);
	localStorage.setItem('NewData', JSON.stringify(listArray));

	PrintList();
}

// 刪除資料
function delList(index) {
	let localStorageData = localStorage.getItem('NewData');

	listArray = JSON.parse(localStorageData);
	listArray.splice(index, 1);
	localStorage.setItem('NewData', JSON.stringify(listArray));

	PrintList();
}

// 清除所有資料
function clearData(){
	listArray = [];
	localStorage.clear();
	myList.innerHTML = '';
	console.log(listArray);
}