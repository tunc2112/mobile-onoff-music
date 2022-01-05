import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {unitH} from '../asset/styles/size';

const AnalogPopup = ({isShown, text, hidden}) => {
  useEffect(() => {
    if (isShown) {
      setTimeout(() => {
        hidden();
      }, 1000);
    }
  }, [isShown]);
  return (
    <Modal
      isVisible={isShown}
      style={localStyles.modal}
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      hasBackdrop={false}>
      <View style={localStyles.modalContain}>
        <Text style={localStyles.modalLabel}>{text}</Text>
      </View>
    </Modal>
  );
};
const localStyles = StyleSheet.create({
  modal: {justifyContent: 'flex-start'},
  modalContain: {
    padding: 8 * unitH,
    backgroundColor: '#66e146',
    opacity: 0.9,
    marginHorizontal: 20 * unitH,
    borderRadius: 10,
  },
  modalLabel: {textAlign: 'center', fontSize: 16},
});

export default AnalogPopup;
