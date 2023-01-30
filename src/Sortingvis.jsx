import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
 

import "./sortingvis.css";
 
 

const Sortingvis = (props, ref) => {


  // for calling child components from parent
  useImperativeHandle(ref, () => ({
    bubble,
    selection,
    quicksort,
    mergesort,
    reset,
  }));


  const [arr, setarr] = React.useState([]);
  const [size, setsize] = React.useState(props.arrsize);

  const [state, setstate] = React.useState(100);
  var speedofsort = useRef(100);

  // function that controls speed of sorting
  function handle(e) {
    setstate(e.target.value);
    speedofsort.current = e.target.value;
  }


  //function for resetting array elements

  function reset() {
    
    const arrr = [];
    for (let i = 1; i <= size; i++) {
      arrr.push(randomnum(1, 500));
    }
    setarr(arrr);

    let arrbar = document.getElementsByClassName("arr-block");

    for (let i = 0; i < arrbar.length; i++) {
      arrbar[i].style.background = " linear-gradient(to top  , blue, red)";
    }
  }

  //function for randum numbers generation
  function randomnum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

    
  React.useEffect(() => {
    reset();
    setsize(props.arrsize);
  }, [props.arrsize]);


  // function for some delay by waiting for a promise to resolve
  function wait() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, speedofsort.current);
    });
  }

async function mergesort()
{
  props.handledisable();
 await domergesort(arr , 0 , arr.length-1);
 props.handledisable();
}

async function domergesort(arr,l,r)
{
  if(l<r)
  {
    const arrbars = document.getElementsByClassName("arr-block");
   let m =Math.floor( l+(r-l)/2);
    arrbars[m].style.background = `black`
    await wait()
     await  domergesort(arr,l,m);
    await domergesort(arr,m+1,r);
    await merge(arr,l,m,r);
  }
}

async function merge(arr,l,m,r)
{     
  const arrbars = document.getElementsByClassName("arr-block");
    let size = r-l+1; 
     let temp = new Array(size)
     let a =0;
     let k=l,j=m+1;

     while(k<=m && j<=r)
     {
       if(arr[k]<=arr[j])
       {
        arrbars[k].style.background = "blue";
        arrbars[j].style.background = "blue";
        await wait()
        arrbars[k].style.background = "yellow";
        arrbars[j].style.background = "yellow";
        [ arrbars[k].style.height , arrbars[j].style.height] =  [ arrbars[j].style.height , arrbars[k].style.height] 
         temp[a] = arr[k];
         a++;
         k++;
       
         
       }
       else {
        arrbars[k].style.background = "blue";
        arrbars[j].style.background = "blue";
        await wait()
        arrbars[k].style.background = "yellow";
        arrbars[j].style.background = "yellow";
        [ arrbars[k].style.height , arrbars[j].style.height] =  [ arrbars[j].style.height , arrbars[k].style.height] 
        temp[a] = arr[j];
        a++;
        j++;

 
       }
     }

     while(k<=m)
     {
        temp[a] = arr[k];
        arrbars[k].style.height = `${arr[k]}px`;
        arrbars[k].style.background = "blue";
        arrbars[k].style.background = "yellow";
        await wait()
        a++;
       k++;
     }
     while(j<=r)
     {
        temp[a] = arr[j];
        arrbars[j].style.height = `${arr[j]}px`;
        arrbars[j].style.background = "blue";
        arrbars[j].style.background = "yellow";
        await wait()
       j++;
       a++;
     }

     for(let i=l;i<=r;i++)
     {
       arr[i] = temp[i-l];
       arrbars[i].style.height = `${arr[i]}px`;
      //  arrbars[j].style.background = `blue`;
     }

}
 
 
  /// quick sort function
  async function quicksort() {
     
    props.handledisable();

    const arrbars = document.getElementsByClassName("arr-block");
    await doquicksort(arr, 0, arr.length - 1);

    for (let i = 0; i < arrbars.length; i++) {
      await wait();
      arrbars[i].style.background = "green";
    }
    
    props.handledisable();
  }

  async function doquicksort(arr, s, end) {
    if (s < end) {
      let pivot = await partion(arr, s, end);
      await doquicksort(arr, s, pivot - 1);
      await doquicksort(arr, pivot + 1, end);
    }
  }

  /// partition function for quick sort
  async function partion(arr, s, end) {
    const arrbars = document.getElementsByClassName("arr-block");

    let pivot = arr[end];
    arrbars[end].style.background = "black";
    let i = s - 1;
    for (let j = s; j <= end - 1; j++) {
      i === -1 ? "" : (arrbars[i].style.background = "yellow");

      arrbars[j].style.background = "red";
      await wait();
      if (arr[j] < pivot) {
        i === -1 ? "" : (arrbars[i].style.background = "blue");

        arrbars[i + 1].style.height = `${arr[j]}px`;
        arrbars[j].style.height = `${arr[i + 1]}px`;

        i++;
        [arr[j], arr[i]] = [arr[i], arr[j]];
      }
      arrbars[j].style.background = "blue";
    }
    i === -1 ? "" : (arrbars[i].style.background = "blue");

    arrbars[i + 1].style.height = `${arr[end]}px`;
    arrbars[end].style.height = `${arr[i + 1]}px`;

    [arr[end], arr[i + 1]] = [arr[i + 1], arr[end]];

    return i + 1;
  }

  ///bubble sort

  async function bubble() {
    props.handledisable();
    const arrbars = document.getElementsByClassName("arr-block");

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (i === 0) {
          arrbars[j].style.background = "  black";
          arrbars[j + 1].style.background = "  black";
        } else {
          arrbars[j].style.background = " yellow";
          arrbars[j + 1].style.background = "  yellow";
        }

        if (arr[j] >= arr[j + 1]) {
          await wait();
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
        arrbars[j].style.height = `${arr[j]}px`;
        arrbars[j + 1].style.height = `${arr[j + 1]}px`;

        arrbars[j].style.background = " black ";
        arrbars[j + 1].style.background = "  black";
      }

      arrbars[arr.length - i - 1].style.background = "green";
    }
    arrbars[0].style.background = "green";
    props.handledisable();
  }

  //selection sort
  async function selection() {
    props.handledisable();

    const arrbars = document.getElementsByClassName("arr-block");

    for (let i = 0; i < arr.length - 1; i++) {
      let min = i;

      let trackmin = min;
      for (let j = i + 1; j < arr.length; j++) {
        arrbars[j].style.background = "yellow";

        if (min !== trackmin) {
          arrbars[trackmin].style.background = "black";
          trackmin = min;
        }
        await wait();
        arrbars[min].style.background = "red";
        arrbars[i].style.background = "#5D3FD3";

        if (arr[j] < arr[min]) {
          min = j;
        }

        arrbars[j].style.background = "black";
      }

      arrbars[trackmin].style.background = "black";
      if (min !== i) {
        arrbars[min].style.height = `${arr[i]}px`;
        arrbars[i].style.height = `${arr[min]}px`;

        [arr[min], arr[i]] = [arr[i], arr[min]];
      }

      arrbars[i].style.background = "green";
    }
    arrbars[arr.length - 1].style.background = "green";
    props.handledisable();
  }

 

 

  return (
    <div className="array-container">
      <div className="row">
        <div className=" left-div  col-9 ">
          <div className="array-bars ">
            {arr.map((value, idx) => {
              return (
                <div
                  key={idx}
                  style={{ height: `${value}px` }}
                  className="arr-block"
                >
                  {" "}
                </div>
              );
            })}
          </div>
        </div>

        <div className="inputbar col">
          <h3>Speed</h3>
          <input
            type="range"
            onChange={handle}
            min={10}
            max={1000}
            value={state}
          />
          <h3>{state} ms </h3>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(Sortingvis);
