// var nowValue = []
let addValue = document.querySelector('#addValue');

// 頁面讀取後偵測並列印 Local Storage
function onloadPrint() {
	let localStorageData = localStorage.getItem('NewData');

	if (localStorageData != null) {
		listArray = JSON.parse(localStorageData);

		for (i=0; i<listArray.length; i++) {
			const myList = document.querySelector('#myList')
			const newItem = document.createElement('li')
			newItem.innerHTML = `
								<span>${listArray[i]}</span>
								<button class="edit" onclick="editList()"></button>
								<button class="del" onclick="delList()"></button>
								`
			myList.appendChild(newItem);
		}
	}
}

// add按鈕事件
function getData(){	
	let localStorageData = localStorage.getItem('NewData');
	myList.innerHTML = '';

	// 若input有值
	if (addValue.value != '') {
		if (localStorageData == null) {
			listArray = [];
		} else {
			listArray = JSON.parse(localStorageData);
		}
		listArray.push(addValue.value);
		localStorage.setItem('NewData', JSON.stringify(listArray));
		addValue.value = '';
		console.log(localStorage);

		for (i=0; i<listArray.length; i++) {
			// console.log(listArray[i])
			const myList = document.querySelector('#myList')
			const newItem = document.createElement('li')
			newItem.innerHTML = `
								<span>${listArray[i]}</span>
								<button class="edit" onclick="editList()"></button>
								<button class="del" onclick="delList()"></button>
								`
			myList.appendChild(newItem);
		}
	} else {
		listArray = JSON.parse(localStorageData);

		for (i=0; i<listArray.length; i++) {
			const myList = document.querySelector('#myList')
			const newItem = document.createElement('li')
			newItem.innerHTML = `
								<span>${listArray[i]}</span>
								<button class="edit"></button>
								<button class="del"></button>
								`
			myList.appendChild(newItem);
		}
	}
}
// 鍵盤Enter事件
document.addEventListener('keydown', event => {
 	if (event.key === 'Enter') {
 		document.querySelector('#add').click();
 	}
})

myList.addEventListener('click', event => {
	// Edit
	if (event.target.classList.contains('edit')) {
		event.target.classList.remove('edit')
		event.target.classList.add('done')

		const itemVelue = event.target.parentNode.querySelector('span').innerHTML
		const editInput = document.createElement('input')
		editInput.value = itemVelue
		event.target.parentNode.prepend(editInput)
		event.target.parentNode.removeChild(event.target.parentNode.querySelector('span'))

	// Submit
	} else if (event.target.classList.contains('done')) {
		event.target.classList.remove('done')
		event.target.classList.add('edit')

		const getIndex = event.target.parentNode
		const newValue = event.target.parentNode.querySelector('input').value
		const newSpan = document.createElement('span')
		newSpan.innerHTML = newValue
		event.target.parentNode.prepend(newSpan)
		event.target.parentNode.removeChild(event.target.parentNode.querySelector('input'))
	}
})

// 編輯資料
/*
function editList() {
	if (event.target.classList.contains('edit')) {
		event.target.classList.remove('edit')
		event.target.classList.add('done')

		const itemVelue = event.target.parentNode.querySelector('span').innerHTML
		const editInput = document.createElement('input')
		editInput.value = itemVelue
		event.target.parentNode.prepend(editInput)
		event.target.parentNode.removeChild(event.target.parentNode.querySelector('span'))
	} else {
		event.target.classList.remove('done')
		event.target.classList.add('edit')

		const newValue = event.target.parentNode.querySelector('input').value
		const newSpan = document.createElement('span')
		newSpan.innerHTML = newValue
		event.target.parentNode.prepend(newSpan)
		event.target.parentNode.removeChild(event.target.parentNode.querySelector('input'))
	}
}
*/

// 刪除資料
function delList() {
	event.target.parentNode.parentNode.removeChild(event.target.parentNode)
}

// 清除所有資料
function clearData(){
	localStorage.clear();
	myList.innerHTML = '';
	console.log(localStorage)
}