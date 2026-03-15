import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { addDoc, collection, collectionData, CollectionReference, doc, docData, DocumentData, DocumentReference, Firestore, getDoc, getDocs, orderBy, query, updateDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class MasterService {
 private tokensCollection: AngularFirestoreCollection<Token>;
  constructor(private firestore: Firestore) { 
      // this.tokensCollection = this.afs.collection<Token>('/tokens');
  }

  saveTokenNumber(number: number) {
  // Save to a SINGLE document called 'current-token'
  // this.afs.doc('config/current-token').set({
  //   number: number,
  //   updatedAt: new Date()
  // });
}


  getUser() {
    const userDoc = doc(this.firestore, 'Users/1vHSyWjEwnQGMSi5CYgY');
    return docData(userDoc);
  }

  createUser(userData:any){
    const userRef = collection(this.firestore, 'Hospitals/Hospital_1/Users') as CollectionReference;
    const docRef =  addDoc(userRef, userData);
    return docRef;
  }

  createToken(tokenData:any){
    const tokenRef = collection(this.firestore, 'Hospitals/Hospital_1/Tokens/') as CollectionReference;
    const docRef = addDoc(tokenRef,tokenData);
    return docRef;
  }
  createPatient(tokenData:any){
    const tokenRef = collection(this.firestore, 'Hospitals/Hospital_1/Patients/') as CollectionReference;
    const docRef = addDoc(tokenRef,tokenData);
    return docRef;
  }

async getHospitalCompleteData() {
  const hospitalDoc = doc(this.firestore, 'Hospitals/Hospital_1');
  
  // Get document fields + specific subcollections
  const [hospitalSnap, patientSnap] = await Promise.all([
    getDoc(hospitalDoc),
    getDocs(
      query(
      collection(this.firestore, 'Hospitals/Hospital_1/Patients'),
      orderBy('tokenNo','asc')
      )
    ),
  ]);

  return {
    hospital: hospitalSnap.exists() ? { id: hospitalSnap.id, ...hospitalSnap.data() } : null,
    patients: patientSnap.docs.map(d => ({ id: d.id, ...d.data() }))
  };
}

updateStatus(patientId:string,status:any){
   const patientRef = doc(this.firestore, `Hospitals/Hospital_1/Patients/${patientId}`)

   return updateDoc(patientRef,{
    status: status
   });
}

}


