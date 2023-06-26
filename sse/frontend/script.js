let para = document.getElementById("data");
let btn = document.getElementById("btn")
const sse =  new EventSource("http://localhost:4001/stream");

sse.onmessage=(event)=>{
        let streamdata = event.data
        para.innerHTML = JSON.parse(streamdata).stream
}
btn.onclick = ()=>{
    sse.close()
}