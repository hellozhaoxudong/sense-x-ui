
let reqCount = 0;
let instance = null;

export function setLoadingInstance(ref){
    console.log('showLoading', reqCount, ref.value)
    instance = ref.value
}

export function showLoading(){
    reqCount++
    if(reqCount >= 1){

        instance?.show()
    }
}

export function hideLoading(){
    reqCount--;

    if(reqCount <= 0){
        reqCount = 0
        instance?.hide()
    }
}