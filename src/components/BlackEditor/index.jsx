import React from 'react';

import { styled } from '@mui/material/styles';

import { useCreateBlockNote, SuggestionMenuController } from '@blocknote/react';
import { filterSuggestionItems, BlockNoteSchema, defaultInlineContentSpecs } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';

import { Mention } from './Mention';

const StyledEditor = styled('div')({
  width: '100%',
  padding: '20px 0',
  borderTop: '1px solid #e6ebf1',
  '& .editor': {
    background: '#ffffff',
    fontSize: '12px',
    color: '#333333'
  },
  '& .editor [class^="_inlineContent"]:before': {
    color: '#999999'
  }
});

const BlackEditor = () => {
  const schema = BlockNoteSchema.create({
    inlineContentSpecs: {
      ...defaultInlineContentSpecs,
      mention: Mention
    }
  });

  const editor = useCreateBlockNote({
    schema,
    initialContent: [
      {
        type: 'paragraph'
      }
    ]
  });

  const getMentionMenuItems = (editor) => {
    const users = ['Steve', 'Bob', 'Joe', 'Mike'];

    return users.map((user) => ({
      title: user,
      onItemClick: () => {
        editor.insertInlineContent([
          {
            type: 'mention',
            props: {
              user
            }
          },
          ' '
        ]);
      }
    }));
  };

  return (
    <StyledEditor>
      <BlockNoteView editor={editor} theme="white">
        <SuggestionMenuController
          triggerCharacter={'@'}
          getItems={async (query) => filterSuggestionItems(getMentionMenuItems(editor), query)}
        />
      </BlockNoteView>
    </StyledEditor>
  );
};

export default BlackEditor;
