import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

const TerminalComponent = () => {
    const terminalRef = useRef(null);

    useEffect(() => {
        if(terminalRef?.current){
        const term = new Terminal();
        term.open(terminalRef.current);

        term.write('Hello from \x1B[1;3;31mshellow!\x1B[0m $ ')
        let cursor = 0;
        let input = "";


        // 입력 데이터 처리 로직 추가
        // 예시: 입력된 데이터를 서버로 전송 등
        term.onData(data => {            
            let code = data.charCodeAt(0);
            console.log("data", data)
            console.log("code: ",code)

            if(code == 13){
              if(input === "clean"){
                term.clear()
                
              }else{
                term.writeln("")
                term.write('Hello from \x1B[1;3;31mshellow!\x1B[0m $ ')
              }
              
              
              input = "";
              cursor = 0;
            }else if (code == 27) {
              console.log("conde??", data.slice(1))
              console.log("cursor: ",cursor)
              console.log("cursor: ",input.length)
              switch (data.slice(1)) {
                case '[C': // Right arrow
                  if (cursor < input.length) {
                    cursor += 1;
                    term.write(data);
                    
                  }
                  break;
                case '[D': // Left arrow
                  if (cursor > 0) {
                    cursor -= 1;
                    term.write(data);
                  }
          
                  break;
              }
            }else if (code < 32 || code == 127) { // Control
              if(input.length > 0){
                term.write('\b \b')
                input = input.slice(0, input.length - 1)
                console.log("input: ",input)
              }
              return;
            }else{
              console.log("slice", input.slice(0, cursor))
              input = input.slice(0, cursor) + data + input.slice(cursor);
              console.log("input", input)
              cursor += 1
              term.write(data)              
            }
            
            
        });
      
        return () => {
          term.dispose();
          };
        }
    },[])
    

    return (
        <div ref={terminalRef}></div>
    )
}

export default TerminalComponent