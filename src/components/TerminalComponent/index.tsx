import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

const TerminalComponent = () => {
    const terminalRef = useRef(null);

    useEffect(() => {
        if(terminalRef?.current){
        const terminal = new Terminal();
        terminal.open(terminalRef.current);

        terminal.write('Hello from \x1B[1;3;31mshellow!\x1B[0m $ ')


        terminal.onData((data) => {
            console.log("data",data)
            // 입력 데이터 처리 로직 추가
            // 예시: 입력된 데이터를 서버로 전송 등
            terminal.write(data);
          });
      
        return () => {
            terminal.dispose();
          };
        }
    },[])
    

    return (
        <div ref={terminalRef}></div>
    )
}

export default TerminalComponent