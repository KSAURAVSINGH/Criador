import React from 'react';
import ActionItemBarComp from './actionItemBar';
import ProgressNoteComp from './progressNote';
import { useParams } from 'react-router-dom';
import UserHeaderComp from './userHeader';
import '../styles/actionItem.css'

/**
 * Renders a page that displays the user header, an action item bar, and a progress note.
 * @returns {JSX.Element} The rendered action item page.
 */
function ActionItemComp() {
  const { actionId } = useParams();

  return (
    <div className='action-item-page'>
      <UserHeaderComp />
      <ActionItemBarComp actionId={actionId} />
      <ProgressNoteComp actionId={actionId} />
    </div>
  );
}

export default ActionItemComp;
