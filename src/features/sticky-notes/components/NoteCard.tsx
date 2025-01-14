"use client";

import { Trash } from "lucide-react";
import { NotePositionType, NoteType } from "../types/NodeTypes";
import { MouseEvent, RefObject, useEffect, useRef, useState } from "react";

function autoGrow(textAreaRef: RefObject<HTMLTextAreaElement | null>) {
  if (!textAreaRef.current) return;

  const { current } = textAreaRef;
  current.style.height = "auto"; // Reset the height
  current.style.height = current.scrollHeight + "px"; // Set the new height
}

function NoteCard({ note }: { note: NoteType }) {
  const { colors, position: curPosition, body } = note;
  const [position, setPosition] = useState<NotePositionType>(curPosition);

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const mouseStartPos = { x: 0, y: 0 };

  // Init Height of TextArea
  useEffect(function () {
    autoGrow(textAreaRef);
  }, []);

  function handleMouseMove(e: globalThis.MouseEvent) {
    if (!cardRef.current) return;

    //1 - Calculate move direction
    const mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    //2 - Update start position for next move.
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    //3 - Update card top and left position.
    setPosition({
      x: cardRef.current.offsetLeft - mouseMoveDir.x,
      y: cardRef.current.offsetTop - mouseMoveDir.y,
    });
  }

  function handleMouseDown(
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) {
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    // When Hold Mouse Left-Click, Start Mouse Move Event
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseUp() {
    // When Raise from Holding Mouse Left-Click, Stop MouseMove Event
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  return (
    <div
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      ref={cardRef}
    >
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="card-header"
      >
        <Trash />
      </div>

      <div className="card-body">
        <textarea
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => autoGrow(textAreaRef)}
          ref={textAreaRef}
        ></textarea>
      </div>
    </div>
  );
}

export default NoteCard;
