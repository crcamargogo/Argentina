import confetti from 'confetti';

const groupMapping = {

    "COMANDANTE": [
        "DI LISIO, JULIO OSCAR", "LOPEZ, MIGUEL"
    ], 

    "SOPORTE AEROESPACIAL": [
        "BARON,DIEGO", "CHARRY,JILL"
    ], 

    
    "FACILITADOR": [
        "CEDERMAS, SEBASTIAN", "ALBASINI, EZEQUIEL DARIO", 
        "ARENAS, JOSE MANUEL", "FIGUCCIO, LAURA VERÓNICA", "STECKLOW TECHERA, MARCELO", 
        "FURFARO, HERNAN", "CARPINELLI, SILVINA LORENA", "MERLO, LAURA PATRICIA"
    ],
    "ÁGIL Y SIMPLE": [
        "LLEBEILI, MARIELA VERONICA", "NU脕EZ, VIRGINIA PAULA", "SERAFINI, LUCAS", 
        "NAVAS, DENISE AYELEN", "FIGUEROA, NAHUEL LIVIO SEBASTI", "MARCHETTI, OSCAR ALBERTO", 
        "ÁLVAREZ, EMILIO", "JARULAKIS, DIEGO MARTIN", "CASTIGLIONE, CLAUDIO ARIEL", 
        "DOPORTO, LUCIA SOLEDAD"
    ],
    "En equipo ganamos": [
        "PALAVECINO, MATIAS EMILIANO", "RODRIGUEZ, ROMINA SOLEDAD", "MIGNONE, MATIAS EZEQUIEL", 
        "MENDEZ, SILVANA SOLEDAD", "SCURNIK, EZEQUIEL", "MARTIN, ESTEBAN LEONARDO", 
        "PEARSON, CECILIA MARIA", "KOTLIARSKY, NATALIA VERONICA"
    ],
    "Pensamiento agile": [
        "BENEGAS, BERNARDO FABIAN", "NU脕EZ, FABIANA VALERIA", "MUI脕O, MARIA MARTA", 
        "RAMOS, AGOSTINA", "MALDONADO, FACUNDO FABIAN", "GAMARRA, CELESTE SOLEDAD", 
        "DESIDEERI, JONATAN MARIO DAVID", "SANABRIA, SOFIA", "RODRÍGUEZ SUÁREZ, MARIANA SOLEDAD"
    ],
    "Cuidamos de los nuestros": [
        "ALANIZ, ROSANA VERONICA", "SAMUDIO SABBATELLA, MARIA DE LOS ANGELES", 
        "IACONO DI PETTA, NATALIA DANIELA", "JAUREGUY, CAMILA", "VIDELA SUAREZ, PATRICIA CAROL", 
        "ALVAREZ, BARBARA CECILIA", "GODOY, MARIA CAROLINA", "MAIDANA, PABLO ARIEL", 
        "BAPTISTA, MARIA F WigANDA"
    ],
    "Entrega de resultados": [
        "HERRERA, JERONIMO", "HEIRFELD DEL VALLE, HERNAN LUCAS", "OLIVERO, MARIA VICTORIA", 
        "FILOMENA, GISELA SABRINA", "BUSTINGORRY, FLORENTINA", "LIENDRO, JOHANNA KARINA", 
        "COLOMBO, LUIS GUILLERMO", "FITTIPALDI, SEBASTIAN HORACIO", "BIANCIOTTI, LUCIA", 
        "GRABOWSKI, ROMINA GABRIELA"
    ],
    "Mente Abierta": [
        "MARCUZZI, CARLA GRACIELA", "MOLINARI, ANDRES HERNAN", "ZARATE, NAHUEL OMAR", 
        "GONZALEZ, MARIANA ALEJANDRA", "PALACIO, MICAELA GRISELDA", "FERRERAS, GISELA", 
        "BUSTO VENTURA, GISELLE ANDREA", "PARAPETI, MARTIN SAUL", "BARRAZA, JONATHAN GASTON", 
        "ZAMORANO, LUIS", "CAMOZZI, JOSE EDUARDO", "NIETO, MARIANA ALEJANDRA", 
        "GONZALEZ, IVANA LORENA"
    ],
    "Socios estratéegicos": [
        "RESSIA, ROMINA SILVANA", "BAEZ, ANA KARENINA", "VALLEJOS, CLAUDIA ELIZABETH", 
        "EBEL, FRANCO IVAN", "CEBALLOS, YAMILA JACQUELINE", "ACUÑA, FERNANDO IVAN", 
        "ROSSI, GUILLERMO DAMIAN", "ESCOBAR, PABLO EMMANUEL", "BAEZ, LUCIANO ANTONIO", 
        "ALMIRON MARIANO, MARTIN MIGUEL FELIPE", "CESPEDES, FLAVIA PAMELA", 
        "PACHECO PUENTE, MARIELA INES", "OLMEDO, JUAN CARLOS"
    ],
    "One Atento": [
        "SANCHEZ GIMENEZ, MARCELO ANDRES", "GUTIERREZ CARRIZO, RICARDO ARIEL", 
        "DANILOWICZ, YAEL SOLEDAD", "LOPEZ, ANTONIA ALICIA", "SOSA, GABRIELA", 
        "LENCINA, NOELIA ROMINA", "SIR, RAMIRO ALFREDO", "SOSA, JULIO RICARDO", 
        "MONACHESI, WALTER", "MARTINEZ IRAZUZTE, EMILIO", "DI COSTANZO, JORGE ADRIAN"
    ]
};

// Enhanced shuffle function to create a more random order
function enhancedShuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Map to track which participants are already in their predefined groups
const participantGroupMap = new Map();

// Populate participants with a randomized order within each group
const shuffledParticipants = [];
Object.entries(groupMapping).forEach(([group, members]) => {
    const shuffledMembers = enhancedShuffle(members);
    shuffledMembers.forEach(member => {
        participantGroupMap.set(member, group);
        shuffledParticipants.push(member);
    });
});

// Perform a final shuffle of the entire participant list
const participants = enhancedShuffle(shuffledParticipants);

let selectedParticipant = null;
const currentGroupAssignments = {};
const selectedParticipants = new Set(); // Track selected participants

function createAvatar(name) {
    return name.split(' ')[0][0] + name.split(' ')[1][0];
}

function createGroupDisplay() {
    const groupsContainer = document.getElementById('groupsContainer');
    groupsContainer.innerHTML = '';

    Object.keys(groupMapping).forEach(group => {
        const groupCard = document.createElement('div');
        groupCard.classList.add('group-card', 'empty');
        
        const groupTitle = document.createElement('h3');
        groupTitle.textContent = group;
        groupCard.appendChild(groupTitle);

        const membersList = document.createElement('ul');
        membersList.id = `group-${group.replace(/\s+/g, '-')}`;
        groupCard.appendChild(membersList);

        groupsContainer.appendChild(groupCard);

        // Initialize the current group assignments
        currentGroupAssignments[group] = [];
    });
}

function addParticipantToGroup(participant) {
    // Find the predefined group for the participant
    const group = participantGroupMap.get(participant);
    
    if (group) {
        const groupList = document.getElementById(`group-${group.replace(/\s+/g, '-')}`);
        const groupCard = groupList.closest('.group-card');
        
        // Only add if not already in the group
        if (!currentGroupAssignments[group].includes(participant)) {
            const memberItem = document.createElement('li');
            memberItem.textContent = participant;
            groupList.appendChild(memberItem);
            
            // Update tracking
            currentGroupAssignments[group].push(participant);
            
            // Remove empty state
            groupCard.classList.remove('empty');
            groupCard.classList.add('active');
            
            // Trigger confetti
            confetti({
                particleCount: 50,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }
}

function selectParticipant(participant, card) {
    // Mark the card as used and make it unclickable
    card.classList.add('used');
    card.style.backgroundColor = 'green';
    card.style.color = 'white';
    card.style.opacity = '0.7';
    card.style.pointerEvents = 'none';
    
    // Use the specific click video modal method
    window.openClickVideoModal(participant);

    // Create and spin wheel
    createWheel(participant);
}

function createWheel(selectedParticipant) {
    const wheel = document.getElementById('wheel');
    const wheelSpinner = document.getElementById('wheelSpinner');
    const resultContainer = document.getElementById('resultContainer');
    
    // Clear previous wheel segments
    wheelSpinner.innerHTML = '';
    
    const colors = {

        "COMANDANTE": "#3498db",
        "SOPORTE AEROESPACIAL": "#3498db",
        "FACILITADOR": "#3498db",
        "ÁGIL Y SIMPLE": "#2ecc71", 
        "En equipo ganamos": "#e74c3c",
        "Pensamiento agile": "#f39c12", 
        "Cuidamos de los nuestros": "#9b59b6",
        "Entrega de resultados": "#1abc9c", 
        "Mente Abierta": "#34495e",
        "Socios estratéegicos": "#d35400", 
        "One Atento": "#2980b9"
    };
    
    const groups = Object.keys(groupMapping);
    
    groups.forEach((group, index) => {
        const segment = document.createElement('div');
        segment.classList.add('wheel-spinner-segment');
        
        const angle = (index * 360) / groups.length;
        segment.style.transform = `rotate(${angle}deg)`;
        segment.style.backgroundColor = colors[group];
        
        const segmentText = document.createElement('div');
        segmentText.classList.add('wheel-spinner-text');
        
        const textLines = group.split(' ');
        segmentText.innerHTML = textLines.map(line => `<div>${line}</div>`).join('');
        
        segment.appendChild(segmentText);
        wheelSpinner.appendChild(segment);
    });
    
    const spinDuration = 4000;
    
    // Find the predefined group for the selected participant
    const predefinedGroup = participantGroupMap.get(selectedParticipant);
    
    // Get the index of the predefined group
    const selectedGroupIndex = groups.indexOf(predefinedGroup);
    
    // Calculate spin degrees to land on the correct group
    const randomAdditionalSpins = Math.floor(Math.random() * 4 + 4) * 360; // 4-7 full rotations
    const spinDegrees = (selectedGroupIndex * (360 / groups.length)) + 
                        (360 / groups.length / 2) + // Ensure it lands in the middle of the segment
                        randomAdditionalSpins;
    
    wheel.style.transform = `rotate(${spinDegrees}deg)`;
    
    setTimeout(() => {
        // Clear previous result
        resultContainer.innerHTML = '';
        
        // Wait a moment before revealing the result and adding to group
        setTimeout(() => {
            resultContainer.innerHTML = `
                <p>Participante: ${selectedParticipant}</p>
                <p>Grupo: ${predefinedGroup}</p>
            `;
            
            // Add participant to group AFTER wheel stops
            addParticipantToGroup(selectedParticipant);
            
            confetti();
            
            // Use the specific spin video modal method
            window.openSpinVideoModal(selectedParticipant);
        }, 500);
    }, spinDuration);
}

function createParticipantsGrid() {
    const participantsGrid = document.getElementById('participantsGrid');
    participantsGrid.innerHTML = '';

    participants.forEach(participant => {
        const participantCard = document.createElement('div');
        participantCard.classList.add('participant-card');
        
        const avatar = document.createElement('div');
        avatar.classList.add('avatar');
        avatar.textContent = createAvatar(participant);
        
        const name = document.createElement('div');
        name.classList.add('name');
        name.textContent = participant;
        
        participantCard.appendChild(avatar);
        participantCard.appendChild(name);
        
        participantCard.addEventListener('click', () => selectParticipant(participant, participantCard));
        
        participantsGrid.appendChild(participantCard);
    });
}

function initVideoModal() {
    const clickVideoModal = document.getElementById('clickVideoModal');
    const spinVideoModal = document.getElementById('spinVideoModal');
    const clickVideoModalContent = clickVideoModal.querySelector('.video-modal-content');
    const spinVideoModalContent = spinVideoModal.querySelector('.video-modal-content');
    const clickVideoFrame = document.getElementById('clickVideoFrame');
    const spinVideoFrame = document.getElementById('spinVideoFrame');
    const clickParticipantAvatar = document.getElementById('clickParticipantAvatar');
    const spinParticipantAvatar = document.getElementById('spinParticipantAvatar');
    const clickParticipantName = document.getElementById('clickParticipantName');
    const spinParticipantName = document.getElementById('spinParticipantName');
    const clickAvatarInitials = clickParticipantAvatar.querySelector('.avatar-initials');
    const spinAvatarInitials = spinParticipantAvatar.querySelector('.avatar-initials');

    // Array of different YouTube video URLs for click and spin events
    const clickVideos = [
        'Video1.mp4',  // Rick Roll
        
    ];

    const spinVideos = [
        'Video2.mp4',  // Celebration video
        // Another option
    ];

    function getRandomVideoUrl(videoArray) {
        return videoArray[Math.floor(Math.random() * videoArray.length)];
    }

    function openVideoModal(participant, isSpinTrigger = false) {
        // Hide the other modal before showing the new one
        if (isSpinTrigger) {
            clickVideoModal.style.display = 'none';
            clickVideoModalContent.classList.remove('active');
        } else {
            spinVideoModal.style.display = 'none';
            spinVideoModalContent.classList.remove('active');
        }

        // Determine which modal and its components to use based on trigger type
        const videoModal = isSpinTrigger ? spinVideoModal : clickVideoModal;
        const videoModalContent = isSpinTrigger ? spinVideoModalContent : clickVideoModalContent;
        const videoFrame = isSpinTrigger ? spinVideoFrame : clickVideoFrame;
        const participantAvatar = isSpinTrigger ? spinParticipantAvatar : clickParticipantAvatar;
        const participantName = isSpinTrigger ? spinParticipantName : clickParticipantName;
        const avatarInitials = isSpinTrigger ? spinAvatarInitials : clickAvatarInitials;

        // Always show the modal
        videoModal.style.display = 'flex';
        videoModalContent.classList.add('active');
        
        // Set participant name and avatar
        participantName.textContent = participant;
        avatarInitials.textContent = participant.split(' ')[0][0] + participant.split(' ')[1][0];
        
        // Select video based on trigger type
        const videoUrl = isSpinTrigger 
            ? getRandomVideoUrl(spinVideos) 
            : getRandomVideoUrl(clickVideos);
        
        videoFrame.src = convertToEmbedUrl(videoUrl);
    }

    function convertToEmbedUrl(url) {
        const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        
        if (videoIdMatch && videoIdMatch[1]) {
            return `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=1&mute=1`;
        }
        return url;
    }

    // Expose separate methods for opening each modal type
    window.openClickVideoModal = (participant) => {
        openVideoModal(participant, false);
    };

    window.openSpinVideoModal = (participant) => {
        openVideoModal(participant, true);
    };
}

function initParticipantSearch() {
    const searchInput = document.getElementById('participantSearch');
    const participantCards = document.querySelectorAll('.participant-card');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase().trim();

        participantCards.forEach(card => {
            const participantName = card.querySelector('.name').textContent.toLowerCase();
            
            if (participantName.includes(searchTerm)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createGroupDisplay();  // Create empty group displays first
    createParticipantsGrid();
    initVideoModal();
    initParticipantSearch();  
});