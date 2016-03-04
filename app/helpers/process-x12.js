import Ember from 'ember';

export function processX12([x12Contents]) {
  const results = [];
  let section = '', participantNumber = 0, fields = null;

  function createParticipant(fields) {
    //console.log("==> createParticipant fields", fields);
    results.push({
      firstName: fields['NM1'][4],
      lastName: fields['NM1'][3],
      clientIdForMember: fields['NM1'][9],
      dependent: fields['INS'][1] === 'N',
      groupNumber: fields['REF']['1L'],
      primaryPhone: fields['PER'][4],
      email: fields['PER'][6],
      address1: fields['N3'][1],
      address2: `${fields['N4'][1]}, ${fields['N4'][2]} ${fields['N4'][3]}`,
      ssn: fields['REF']['0F']
    });
  }

  for (let chunk of x12Contents.split(/[~\n]/)) {
    chunk = chunk.trim();
    if (chunk.length === 0) {
      continue;
    }
    if (section !== 'PARTICIPANT') {
      if (chunk.startsWith('ISA')) {
        section = 'INTERCHANGE_CONTROL_HEADER';
      } else if (chunk.startsWith('GS')) {
        section = 'GROUP_HEADER';
      } else if (chunk.startsWith('ST')) {
        section = 'TRANSACTION_SET_HEADER';
      } else if (chunk.startsWith('NM1')) {
        section = 'PARTICIPANT';
      }
      //console.log("==> headers chunk", section, participantNumber, chunk);
    }
    if (section === 'PARTICIPANT') {
      if (chunk.startsWith('NM1')) {
        if (fields) {
          createParticipant(fields);
        }
        participantNumber += 1;
        fields = { 'REF': {} };
      }
      for (let section of 'NM1 INS REF DMG PER N3 N4'.w()) {
        if (chunk.startsWith(section)) {
          var parts = chunk.split('*');
          if (section === 'REF') {
            fields['REF'][parts[1]] = parts[2];
          } else {
            fields[section] = parts;
          }
        }
      }
      //console.log("==> chunk", section, participantNumber, chunk);
    }
  }
  //console.log("==> results", results);
  return results;
}

export default Ember.Helper.helper(processX12);
