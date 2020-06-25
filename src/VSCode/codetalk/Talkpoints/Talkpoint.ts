import * as vscode from 'vscode';

export namespace Microsoft.CodeTalk
{
    // For now CursorPos is just an alias for vscode.Position
    // We may want to extend its functionality like how it is done
    // for Talkpoint.cs (e.g. IsOperationFailed: bool)
    type CursorPos = vscode.Position;

    enum TalkpointType {
        Tonal,
        Textual,
        Expression
    }

    export abstract class Talkpoint
    {
        filePath: string;
        position: CursorPos;
        doesContinue: boolean;

        constructor(filePath: string, position: CursorPos, doesContinue = false) 
        {
            this.filePath = filePath;
            this.position = position;
            this.doesContinue = doesContinue;
        }

        abstract Execute(): void;

        Equals(tp: Talkpoint) : boolean
        {
            if ((tp.filePath === this.filePath) && tp.position.line == this.position.line)
            {
                return true;
            }
            return false;
        }
    }

    class ToneTalkpoint extends Talkpoint
    {
        talkpointTone: Tones;
        // isCustomTone: boolean;
        // customTalkpointTone: CustomTone;

        constructor(filePath: string, position: CursorPos, doesContinue: boolean, tone: Tones) {
            super(filePath, position, doesContinue);
            this.talkpointTone = tone;

        }

        Execute(): void {

        }
    }
}