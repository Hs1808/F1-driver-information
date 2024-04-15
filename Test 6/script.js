function fetchInfo() {
    const year = document.getElementById('year').value;
    const url = `https://ergast.com/api/f1/${year}/1/results.json`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const driverData = data.MRData.RaceTable.Races[0].Results;
        const series = data.MRData.series;
        const season = data.MRData.RaceTable.season;
        const totalResults = driverData.length;
        
  
        let table = `
          <p>Series: ${series}</p>
          <p>Season: ${season}</p>
          <p>Total number of results returned: ${totalResults}</p>
          <table >
            <tr>
              <th style="color: #C52F21;"><strong>Driver Name</strong></th>
              <th style="color: #C52F21;"><strong>Permanent Number</strong></th>
              <th style="color: #C52F21;"><strong>Nationality</strong></th>
              <th style="color: #C52F21;"><strong>Date of Birth</strong></th>
              <th style="color: #C52F21;"><strong>Additional Information</strong></th>
            </tr>
        `;
  
        driverData.forEach(result => {
            const driver = result.Driver;
            table += `
              <tr>
                <td>${driver.givenName} ${driver.familyName}</td>
                <td>${driver.permanentNumber || '-'}</td>
                <td>${driver.nationality}</td>
                <td>${driver.dateOfBirth}</td>
                <td><a href="${driver.url}" target="_blank">Bio</a></td>
              </tr>
            `;
          });
  
        table += `</table>`;
        document.getElementById('display').innerHTML = table;
      })
      .catch(error => {
        console.error('Error fetching driver information:', error);
        document.getElementById('driverInfo').innerHTML = '<p>Error fetching driver information. Please try again.</p>';
      });
  }
  