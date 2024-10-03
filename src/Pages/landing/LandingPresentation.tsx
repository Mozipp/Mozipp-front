
import {
    Button,
    ButtonGroup,
    Flex,
    Input,
    Editable,
    EditableInput,
    IconButton,
    EditableTextarea,
    EditablePreview,
    useEditableControls,
  } from '@chakra-ui/react'

interface LandingPresentationProps{};
    /* Here's a custom control */
    function EditableControls() {
      const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
      } = useEditableControls()
  
      return isEditing ? (
        <ButtonGroup justifyContent='center' size='sm'>
          <Button {...getSubmitButtonProps()} />
          <Button {...getCancelButtonProps()} />
        </ButtonGroup>
      ) : (
        <Flex justifyContent='center'>
          <Button size='sm' {...getEditButtonProps()} />
        </Flex>
      )
    }
const LandingPresentation=(props:any)=>{
    return (

        <div>
        <Button>로그인</Button>
        <Editable
        textAlign='center'
        defaultValue='Rasengan ⚡️'
        fontSize='2xl'
        isPreviewFocusable={false}
      >
        <EditablePreview />
        {/* Here is the custom input */}
        <Input as={EditableInput} />
        <EditableControls />
      </Editable>
      </div>
    )
};

export default LandingPresentation;