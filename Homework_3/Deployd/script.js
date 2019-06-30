var GlobData = new Array();

function onCreate(ev) {
    ev.preventDefault();


    var data = JSON.stringify({
        "NUMB": String(document.getElementById("number").value),
        "USER": String(document.getElementById("user").value),
        "PINC": String(document.getElementById("pin").value),
        "DATE": String(document.getElementById("date").value),
        "STAT": String(document.getElementById("status").value),
        "BALN": String(document.getElementById("balance").value)
    });
    console.log(data);
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            //alert(this.responseText);
            document.getElementById("createForm").dispatchEvent(new Event('submit'));
        }
    });

    xhr.open("POST", "http://localhost:2403/accounts");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

function onRead() {
    console.log('allah');
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            //console.log(this.response);
            result = JSON.parse(this.response);
            JSONtoGlobalDate(result);
            var resultTBody = document.createElement('tbody');
            result.map(function (nthCPU) {
                resultTBody.appendChild(parseCPUToTableRow(nthCPU));
            });

            var table = document.getElementById('rTBody').parentElement;
            table.replaceChild(resultTBody, document.getElementById('rTBody'));
            resultTBody.id = 'rTBody';
            console.log('success');
        }
    });

    xhr.open("GET", "http://localhost:2403/accounts");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function onPrepareUpdate(ev) {

    ev.preventDefault();
    xhrids = new XMLHttpRequest();
    xhrids.withCredentials = true;

    xhrids.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            //console.log(this.response);
            result = JSON.parse(this.response);
            JSONtoGlobalDate(result);
            var ids = document.createElement('select');
            ids.className = 'form-control';
            ids.addEventListener('change', onSelect );
            result.map(function (nthCPU) {
                var id = document.createElement('option');
                id.innerHTML = nthCPU['id'];
                ids.appendChild(id);
            });
            var form = document.getElementById('uid').parentElement;
            form.replaceChild(ids, document.getElementById('uid'));
            ids.id = 'uid';

            var sel_id = ids.options[ids.selectedIndex].innerText;

            result.map(function (urdCPU) {
                if (urdCPU['id'] == sel_id) {
                    document.getElementById('unumber').value    = getValue(urdCPU['NUMB']);
                    document.getElementById('uusername').value  = getValue(urdCPU['USER']);
                    document.getElementById('upincode').value   = getValue(urdCPU['PINC']);
                    document.getElementById('udate').value      = getValue(urdCPU['DATE'].substring(0, 10));
                    document.getElementById('ustatus').value    = getValue(urdCPU['STAT']);
                    document.getElementById('ubalance').value   = getValue(urdCPU['BALN']);
                }
            });

        }
    });
    xhrids.open("GET", "http://localhost:2403/accounts");
    xhrids.setRequestHeader("Content-Type", "application/json");
    xhrids.send();
}

function onUpdate(ev) {
    ev.preventDefault();


    var data = JSON.stringify({
        "NUMB": String(document.getElementById("unumber").value),
        "USER": String(document.getElementById("uusername").value),
        "PINC": String(document.getElementById("upincode").value),
        "DATE": String(document.getElementById("udate").value),
        "STAT": String(document.getElementById("ustatus").value),
        "BALN": String(document.getElementById("ubalance").value)
    });
    console.log(data);
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    let id = document.getElementById("uid").value;

    xhr.open("PUT", "http://localhost:2403/accounts/" + id );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

function onDelete(ev) {
    ev.preventDefault();
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("DELETE", "http://localhost:2403/accounts/" + document.getElementById("did").value);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function parseCPUToTableRow(CPUs) {
    var row = document.createElement('tr');

    id = document.createElement('th');
    id.innerText = CPUs['id'];
    row.appendChild(id);

    number = document.createElement('td');
    number.innerText = CPUs['NUMB'];
    row.appendChild(number);

    username = document.createElement('td');
    username.innerText = CPUs['USER'];
    row.appendChild(username);

    pincode = document.createElement('td');
    pincode.innerText = CPUs['PINC'];
    row.appendChild(pincode);

    date = document.createElement('td');
    if (CPUs['DATE'] != undefined) {
        date.innerText = CPUs['DATE'];
        row.appendChild(date);
    }

    stat = document.createElement('td');
    if (CPUs['STAT'] != undefined) {
        stat.innerText = CPUs['STAT'];
        row.appendChild(stat);
    }

    balance = document.createElement('td');
    if (CPUs['BALN'] != undefined) {
        balance.innerText = CPUs['BALN'];
        row.appendChild(balance);
    }

    return row;
}

function onSelect(ev) {
    ev.preventDefault();
    var ids = ev.srcElement;

    var sel_id = ids.options[ids.selectedIndex].innerText;

    GlobData.map(function (urdCPU) {
        if (urdCPU['id'] == sel_id) {
            document.getElementById('unumber').value        = getValue(urdCPU['NUMB']);
            document.getElementById('uusername').value      = getValue(urdCPU['USER']);
            document.getElementById('upincode').value       = getValue(urdCPU['PINC']);
            document.getElementById('udate').value          = getValue(urdCPU['DATE'].substring(0, 10));
            document.getElementById('ustatus').value        = getValue(urdCPU['STAT']);
            document.getElementById('ubalance').value       = getValue(urdCPU['BALN']);
        }
    });
}

function JSONtoGlobalDate(iResult) {
    iResult.map(function (ResLine) {
        GlobData.push(ResLine);
    });
}


(function () {

    document.getElementById('cbutton').addEventListener(
        'click', onCreate
    );
    document.getElementById('rbutton').addEventListener(
        'click', onRead
    );
    document.getElementById('ubutton').addEventListener(
        'click', onUpdate
    );
    document.getElementById('pubutton').addEventListener(
        'click', onPrepareUpdate
    );
    document.getElementById('dbutton').addEventListener(
        'click', onDelete
    );
    console.log('Handlers is set');
})()

function messg() {
    alert('Message');
}

function getValue(par){
    if (par != undefined) { return par; }
    else{ return ''; };
}
