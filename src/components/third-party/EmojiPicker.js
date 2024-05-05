import React, { useState } from 'react';

import { styled } from '@mui/material/styles';
import { Box, IconButton, ClickAwayListener } from '@mui/material';

import Picker from 'emoji-picker-react';
import { SkinTones } from 'emoji-picker-react';

import { IconMoodSmile } from '@tabler/icons-react';

const RootStyle = styled(Box)({
  position: 'relative'
});

const PickerStyle = styled('div')(() => ({
  bottom: 45,
  overflow: 'hidden',
  position: 'absolute',
  left: 0,
  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
  borderRadius: 8,
  '& input': {
    padding: '0 30px'
  }
}));

export default function EmojiPicker({ disabled, value, setValue, alignRight = false, ...other }) {
  const [emojiPickerState, SetEmojiPicker] = useState(false);

  const onEmojiClick = (emojiObject, _) => {
    console.log(_);
    setValue(value + emojiObject.emoji);
  };

  let emojiPicker;
  if (emojiPickerState) {
    emojiPicker = (
      <>
        <Picker onEmojiClick={onEmojiClick} defaultSkinTone={SkinTones.DARK} autoFocusSearch={false} />
      </>
    );
  }

  const triggerPicker = (event) => {
    event.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  };

  const handleClickAway = () => {
    SetEmojiPicker(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <RootStyle {...other}>
        <PickerStyle
          sx={{
            ...(alignRight && {
              right: -2,
              left: 'auto !important'
            })
          }}
        >
          {emojiPicker}
        </PickerStyle>
        <IconButton disabled={disabled} size="small" onClick={triggerPicker}>
          <IconMoodSmile />
        </IconButton>
      </RootStyle>
    </ClickAwayListener>
  );
}
