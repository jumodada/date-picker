import flexOptions from "./options"

export interface flexInstance  {
    flex: { _getReference: () => any; _updateReference: (val: any) => void; _closePopover: () => void; _togglePopover: () => void; _openPopover: () => void; };
    store: { getState: () => number; addState: () => void; };
    (el:HTMLInputElement, config?: flexOptions):void
}