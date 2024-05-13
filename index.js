let start=document.getElementById('start');
let num=document.getElementById('input_size');
let rectangle=document.getElementById('rect');

let buttons=document.getElementsByClassName("box");
let btnindex;
let select=1;
let cnt=1;
let n;
let idis=0;
let name1;
let name2;
let rootparent=document.getElementById("add");
let ele;

start.addEventListener("click",function(e){
    e.preventDefault();
    name1=document.querySelector("#first_name").value;
     name2=document.querySelector("#second_name").value;
    
   
     n=parseInt(num.value);
     if((num=="" || name1=="")||name2==""){
        alert("form the required field!");
     }
     else{
    for(var i=0;i<n;i++){
        for(var j=0;j<n;j++){
            ele=document.createElement('button');
            ele.setAttribute('class','box');

            var id=`${idis}`
            var idx1=`${i}`;

            var idx2=`${j}`;
            ele.setAttribute('id1',idx1);
            ele.setAttribute('id2',idx2);
            ele.setAttribute('id',id);
            rectangle.appendChild(ele);
            idis=idis+1;
        }
        ele=document.createElement('br');
        rectangle.appendChild(ele);
    }
    Initialize(n);
    ele=document.createElement('p');
    ele.innerHTML="its "+`${name1}`+" turn ";
    rootparent.appendChild(ele);
     }
});

c=document.getElementsByTagName('button');
let first_player=[];
let second_player=[];
let initial_array=[];
function Initialize(n){
        first_player=[];
        second_player=[];
        initial_array=[];
    for (let i = 0; i <n; i++) {
        first_player.push(new Array(n).fill(0));
        second_player.push(new Array(n).fill(0));
        initial_array.push(new Array(n).fill(0));
    }
    compare_array(n,initial_array);
};
function compare_array(n,initial_array){
    var s=1;
    for(var i=0;i<n;i++){
        initial_array[i]=[];
        for(var j=0;j<n;j++){
            initial_array[i][j]=s;
            s=s+1;
        }
    }

};
rectangle.addEventListener('click',checkFun,false);
function checkFun(e){
    let i;
    let j;
    let  n;
    if(e.target!=e.currentTarget){
        i=parseInt(e.target.getAttribute('id1'));
        j=parseInt(e.target.getAttribute('id2'));
        btnindex=parseInt(e.target.id);  
        let childbtn=e.target;
        n=parseInt(num.value);
        if(first_player[i][j]==0 && second_player[i][j]==0){
        userClick(i,j,n,btnindex,first_player,second_player,childbtn);
    
        win(initial_array,first_player,n,i,j);
        }
        else{
            alert("already marked!")
        }
    }
};

let flag=0;
function display(cnt){
   
    ele.innerHTML="";
    if(cnt%2!=0){
       
        ele.textContent="its "+`${name2}`+" turn ";
        console.log(name1);
        rootparent.appendChild(ele);
       
    }
    else{
       
        ele.textContent="its "+`${name1}`+" turn ";
        console.log(name2);
        rootparent.appendChild(ele);
              
    }
}


function userClick(i,j,n,btnindex,first_player,second_player,childbtn){
    let index;
  
        if(cnt%2!=0){
            display(cnt);
            cnt++;
            childbtn.style.backgroundImage = "url('letter-x.png')";
            first_player[i][j]=btnindex+1;
            
            
        }
        else if(cnt%2==0){ 
          
            display(cnt);
            cnt++;
            second_player[i][j]=btnindex+1;
            childbtn.style.backgroundImage = "url('zero.png')"; 
     }
        
        
        
};




function win(initial_array,first_player,n,i,j){
    let s1,s2;
    if(select%2!=0){
         s1=firstWin(initial_array,first_player,n,i,j);
         select++;
    }
    else if(select%2==0){
     s2=secondWin(initial_array,second_player,n,i,j);
     select++;
    }
    // select++;
    if(s1){
        rectangle.removeEventListener('click',checkFun,false);
        return 0;
    }
    else if(s2){
        rectangle.removeEventListener('click',checkFun,false);
        return 0;
    }
}


function firstWin(initial_array,first_player,n,i,j){
    let rowCheck=row(initial_array,first_player,n,i,j);
    let colCheck=col(initial_array,first_player,n,i,j);
    let diagonalCheck;
    if(i==j){
    diagonalCheck=diagonal1(initial_array,first_player,n,i,j);
    }
    else if(i==0 && j==n-1){
        diagonalCheck=diagonal2(initial_array,first_player,n,i,j);
    }

    if((rowCheck||colCheck)||diagonalCheck){
        let ele1=document.createElement('p');
        ele.textContent="";
        ele1.textContent="congrats! "+`${name1}`+" you won ";
        rootparent.appendChild(ele1);
        console.log("congrats! "+`${name1}`+" you won ");
       rectangle.removeEventListener('click',checkFun,false);
        return 1;
    }
    else{
        return 0;
    }
}

function secondWin(initial_array,first_player,n,i,j){
    let rowCheck=row(initial_array,first_player,n,i,j);
    let colCheck=col(initial_array,first_player,n,i,j);
    let diagonalCheck;
    if(i==j){
    diagonalCheck=diagonal1(initial_array,first_player,n,i,j);
    }
    else if(i==0 && j==n-1){
        diagonalCheck=diagonal2(initial_array,first_player,n,i,j);
    }

    if((rowCheck||colCheck)||diagonalCheck){
        let ele1=document.createElement('p');
        ele.textContent="";
        ele1.textContent="congrats! "+`${name2}`+" you won ";
        rootparent.appendChild(ele1);
        console.log("congrats! "+`${name2}`+" you won ");
        rectangle.removeEventListener('click',checkFun,false);
        return 1;
    }
    else{
        return 0;
    }
}

function row(initial_array,first_player,n,i,j){
    let check=1;
    for(let j=0;j<n;j++){
        if(initial_array[i][j]!=first_player[i][j]){
            check=0;
            break;
        }
    }
    return check;
}
function col(initial_array,first_player,n,i,j){
    let check=1;
    for(let i=0;i<n;i++){
        if(initial_array[i][j]!=first_player[i][j]){
            check= 0;
            break;
        }
    }
    return check;
}
function diagonal1(initial_array,first_player,n,i,j){
    let check=1;
    let x=0,y=0;
    while(x<n && y<n){
        if(initial_array[x][y]!=first_player[x][y]){
            check=0;
            break;
        }
        x++;
        y++;
    }
    return check;
    
}

function diagonal2(initial_array,first_player,n,i,j){
    let check=1;
    let x=0,y=n-1;
    while(x<n && y>=0){
        if(initial_array[x][y]!=first_player[x][y]){
            check=0;
            break;
        }
        x++;
        y--;
    }
    return check;
    
}
