import React from 'react';

import { styled } from '@mui/material/styles';

import { SuggestionMenuController, useCreateBlockNote } from '@blocknote/react';
import { BlockNoteSchema, defaultInlineContentSpecs, filterSuggestionItems } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';

import { Mention } from './Mention';

import { handleUserName, uploadDocument } from 'utils/utilsFn';

const StyledEditor = styled('div')({
  width: '100%',
  minHeight: '285px',
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

const BlackEditor = ({ value, handleChange, userList }) => {
  const schema = BlockNoteSchema.create({
    inlineContentSpecs: {
      ...defaultInlineContentSpecs,
      mention: Mention
    }
  });

  const getMentionMenuItems = (editor) => {
    const users = userList.map((data) => handleUserName(data.user));

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

  const handleUpload = async (file) => {
    const url = await uploadDocument('eleven/task', file);
    return url;
  };

  const editor = useCreateBlockNote({
    schema,
    uploadFile: handleUpload,
    initialContent: value
  });

  return (
    <StyledEditor>
      <BlockNoteView key={value} editor={editor} theme="white" onChange={() => handleChange(editor.document)}>
        <SuggestionMenuController
          triggerCharacter={'@'}
          getItems={async (query) => filterSuggestionItems(getMentionMenuItems(editor), query)}
        />
      </BlockNoteView>
    </StyledEditor>
  );
};

export default BlackEditor;
