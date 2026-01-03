import { Mail, Phone, User, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { styles } from '../styles';

interface UserProfile {
  name: string;
  email: string;
  number: string;
}

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  theme: any;
  user: UserProfile;
  setUser: (user: UserProfile) => void;
}

const EditProfileModal = ({ visible, onClose, theme, user, setUser }: EditProfileModalProps) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [number, setNumber] = useState(user.number);

  useEffect(() => {
    if (visible) {
      setName(user.name);
      setEmail(user.email);
      setNumber(user.number);
    }
  }, [visible, user]);

  const handleSave = () => {
    setUser({ ...user, name, email, number });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      {/* 1. MOVE KeyboardAvoidingView TO THE TOP LEVEL */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* 2. Overlay handles the touch-to-close and centering */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalOverlay}>
            
            {/* 3. Stop propagation on the actual modal content */}
            <TouchableWithoutFeedback>
              <View style={[styles.modalContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
                
                {/* Header */}
                <View style={styles.modalHeader}>
                  <Text style={[styles.modalTitle, { color: theme.text }]}>
                    {name ? `Jai Shri Krishna, ${name}` : 'Create Profile'}
                  </Text>
                  <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
                    <X color={theme.subText} size={24} />
                  </TouchableOpacity>
                </View>

                {/* Body */}
                <View style={styles.modalBody}>
                  {/* Name Input */}
                  <View style={[styles.inputGroup, { backgroundColor: theme.inputBg }]}>
                    <User color={theme.subText} size={20} style={{ marginRight: 10 }} />
                    <TextInput 
                      style={[styles.modalInput, { color: theme.text }]}
                      placeholder="Your Name"
                      placeholderTextColor={theme.subText}
                      value={name}
                      onChangeText={setName}
                    />
                  </View>

                  {/* Email Input */}
                  <View style={[styles.inputGroup, { backgroundColor: theme.inputBg }]}>
                    <Mail color={theme.subText} size={20} style={{ marginRight: 10 }} />
                    <TextInput 
                      style={[styles.modalInput, { color: theme.text }]}
                      placeholder="Email Address"
                      placeholderTextColor={theme.subText}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                    />
                  </View>

                  {/* Number Input */}
                  <View style={[styles.inputGroup, { backgroundColor: theme.inputBg }]}>
                    <Phone color={theme.subText} size={20} style={{ marginRight: 10 }} />
                    <TextInput 
                      style={[styles.modalInput, { color: theme.text }]}
                      placeholder="Phone Number"
                      placeholderTextColor={theme.subText}
                      value={number}
                      onChangeText={setNumber}
                      keyboardType="phone-pad"
                    />
                  </View>

                  {/* Save Button */}
                  <TouchableOpacity 
                    style={[styles.saveButton, { backgroundColor: theme.devotionalPrimary }]}
                    onPress={handleSave}
                  >
                    <Text style={styles.saveButtonText}>Save Details</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </TouchableWithoutFeedback>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditProfileModal;