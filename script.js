// Seagull Platform JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Get all the main views
  const shipmentsView = document.getElementById("shipmentsView")
  const shipmentDetailView = document.getElementById("shipmentDetailView")
  const apiView = document.getElementById("apiView")
  const clientPortalView = document.getElementById("clientPortalView")
  const carrierView = document.getElementById("carrierView")
  const consigneesView = document.getElementById("consigneesView")
  const settingsView = document.getElementById("settingsView")

  // Get view toggle elements
  const tableView = document.getElementById("tableView")
  const kanbanView = document.getElementById("kanbanView")

  const documentPreviewModal = document.getElementById("documentPreviewModal")
  const closePreviewModal = document.getElementById("closePreviewModal")
  const documentPreviewContent = document.getElementById("documentPreviewContent")
  const docInfo = document.getElementById("docInfo")

  // Navigation elements
  const navButtons = {
    dashboard: document.getElementById("dashboardBtn"),
    shippers: document.getElementById("shippersBtn"),
    consignees: document.getElementById("consigneesBtn"),
    shipments: document.getElementById("shipmentsBtn"),
    carrier: document.getElementById("carrierBtn"),
    documents: document.getElementById("documentsBtn"),
    settings: document.getElementById("settingsBtn"),
  }

  // Action buttons
  const boardViewBtn = document.getElementById("boardViewBtn")
  const newShipmentBtn = document.getElementById("newShipmentBtn")
  const backBtn = document.getElementById("backBtn")
  const backToShipmentsBtn = document.getElementById("backToShipmentsBtn")
  const backFromPortalBtn = document.getElementById("backFromPortalBtn")

  // Shipment rows
  const shipmentRows = document.querySelectorAll(".shipment-row")

  // Current view state
  let currentView = "shipments"
  let currentShipmentView = "table" // 'table' or 'kanban'

  // Initialize the application
  init()

  function init() {
    setupNavigation()
    setupViewToggles()
    setupShipmentInteractions()
    setupButtons()

    // Show initial view
    showView("shipments")
  }

  function setupNavigation() {
    // Set up navigation click handlers
    Object.keys(navButtons).forEach((key) => {
      if (navButtons[key]) {
        navButtons[key].addEventListener("click", (e) => {
          e.preventDefault()
          handleNavigation(key)
        })
      }
    })
  }

  function handleNavigation(section) {
    // Update active navigation state
    Object.values(navButtons).forEach((btn) => {
      if (btn) {
        btn.classList.remove("bg-seagull-light", "text-white")
        btn.classList.add("text-gray-300")
      }
    })

    if (navButtons[section]) {
      navButtons[section].classList.remove("text-gray-300")
      navButtons[section].classList.add("bg-seagull-light", "text-white")
    }

    // Handle different navigation sections
    switch (section) {
      case "shipments":
        showView("shipments")
        break
      case "dashboard":
        showView("api") // Show API integration as dashboard demo
        break
      case "documents":
        showView("clientPortal") // Show client portal for document management
        break
      case "carrier":
        showView("carrier")
        break
      case "consignees":
        showView("consignees")
        break
      case "settings":
        showView("settings")
        break
      default:
        // For other sections, show a placeholder or keep current view
        console.log(`Navigation to ${section} - Feature coming soon`)
        break
    }
  }

  function setupViewToggles() {
    if (boardViewBtn) {
      boardViewBtn.addEventListener("click", () => {
        toggleShipmentView()
      })
    }
  }

  function toggleShipmentView() {
    if (currentShipmentView === "table") {
      // Switch to kanban view
      tableView.classList.add("hidden")
      kanbanView.classList.remove("hidden")
      boardViewBtn.innerHTML = '<i class="fas fa-table mr-2"></i>Table View'
      currentShipmentView = "kanban"
    } else {
      // Switch to table view
      kanbanView.classList.add("hidden")
      tableView.classList.remove("hidden")
      boardViewBtn.innerHTML = '<i class="fas fa-columns mr-2"></i>Board View'
      currentShipmentView = "table"
    }
  }

  function setupShipmentInteractions() {
    shipmentRows.forEach((row) => {
      row.addEventListener("click", () => {
        const shipmentId = row.getAttribute("data-id")
        showShipmentDetail(shipmentId)
      })
    })
  }

  function setupButtons() {
    // Back button from shipment detail
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        showView("shipments")
      })
    }

    // Back button from API view
    if (backToShipmentsBtn) {
      backToShipmentsBtn.addEventListener("click", () => {
        showView("shipments")
      })
    }

    // Back button from client portal
    if (backFromPortalBtn) {
      backFromPortalBtn.addEventListener("click", () => {
        showView("shipments")
      })
    }

    // New shipment button
    if (newShipmentBtn) {
      newShipmentBtn.addEventListener("click", () => {
        showShipmentDetail("new")
      })
    }

    // Setup document upload simulation
    setupDocumentUpload()

    // Setup client portal interactions
    setupClientPortal()

    setupDocumentPreview()
  }

  function setupDocumentUpload() {
    // Simulate document upload functionality
    const uploadButtons = document.querySelectorAll("button")
    uploadButtons.forEach((btn) => {
      if (btn.textContent.includes("Choose Files") || btn.textContent.includes("Upload Files")) {
        btn.addEventListener("click", (e) => {
          e.preventDefault()
          simulateFileUpload(btn)
        })
      }
    })
  }

  function simulateFileUpload(button) {
    const originalText = button.textContent
    button.textContent = "Uploading..."
    button.disabled = true

    setTimeout(() => {
      button.textContent = "Processing..."
      setTimeout(() => {
        button.textContent = "Completed ✓"
        button.classList.add("bg-green-600")
        setTimeout(() => {
          button.textContent = originalText
          button.disabled = false
          button.classList.remove("bg-green-600")
        }, 2000)
      }, 1500)
    }, 1000)
  }

  function setupClientPortal() {
    // Setup client portal button interactions
    const portalButtons = document.querySelectorAll("#clientPortalView button")
    portalButtons.forEach((btn) => {
      if (
        btn.textContent.includes("Upload Files") ||
        btn.textContent.includes("View Tracking") ||
        btn.textContent.includes("Open Tasks")
      ) {
        btn.addEventListener("click", (e) => {
          e.preventDefault()
          simulatePortalAction(btn)
        })
      }
    })
  }

  function simulatePortalAction(button) {
    const originalText = button.textContent
    button.textContent = "Loading..."

    setTimeout(() => {
      button.textContent = "Action Completed ✓"
      setTimeout(() => {
        button.textContent = originalText
      }, 2000)
    }, 1000)
  }

  function showView(viewName) {
    // Hide all views
    shipmentsView.classList.add("hidden")
    shipmentDetailView.classList.add("hidden")
    apiView.classList.add("hidden")
    clientPortalView.classList.add("hidden")
    carrierView.classList.add("hidden")
    consigneesView.classList.add("hidden")
    settingsView.classList.add("hidden")

    // Show the requested view
    switch (viewName) {
      case "shipments":
        shipmentsView.classList.remove("hidden")
        currentView = "shipments"
        break
      case "shipmentDetail":
        shipmentDetailView.classList.remove("hidden")
        currentView = "shipmentDetail"
        break
      case "api":
        apiView.classList.remove("hidden")
        currentView = "api"
        break
      case "clientPortal":
        clientPortalView.classList.remove("hidden")
        currentView = "clientPortal"
        break
      case "carrier":
        carrierView.classList.remove("hidden")
        currentView = "carrier"
        break
      case "consignees":
        consigneesView.classList.remove("hidden")
        currentView = "consignees"
        break
      case "settings":
        settingsView.classList.remove("hidden")
        currentView = "settings"
        break
    }
  }

  function showShipmentDetail(shipmentId) {
    // Update the shipment ID in the detail view
    const shipmentIdElement = document.getElementById("shipmentId")
    if (shipmentIdElement) {
      shipmentIdElement.textContent = shipmentId === "new" ? "NEW" : shipmentId
    }

    // If it's a new shipment, clear the form
    if (shipmentId === "new") {
      clearShipmentForm()
    } else {
      // Load shipment data (in a real app, this would fetch from API)
      loadShipmentData(shipmentId)
    }

    showView("shipmentDetail")
  }

  function clearShipmentForm() {
    const inputs = document.querySelectorAll("#shipmentDetailView input")
    inputs.forEach((input) => {
      input.value = ""
    })
  }

  function loadShipmentData(shipmentId) {
    // Simulate loading shipment data
    // In a real application, this would make an API call
    const mockData = {
      12345: {
        client: "John Merit",
        company: "Chelan Fresh",
        bookingNumber: "165487985546UYhui",
        destinationPort: "Los Angeles",
        teu: "9,911,159",
        temperature: "F 32",
        item: "lorem ipsum",
        state: "California",
        commodity: "lorem ipsum",
      },
    }

    const data = mockData[shipmentId] || mockData["12345"]

    // Populate form fields
    const inputs = document.querySelectorAll("#shipmentDetailView input")
    inputs.forEach((input) => {
      const label = input.previousElementSibling?.textContent?.toLowerCase()
      if (label && data[label.replace(" ", "")]) {
        input.value = data[label.replace(" ", "")]
      }
    })
  }

  // Add some interactive feedback for buttons
  function addButtonFeedback() {
    const buttons = document.querySelectorAll("button")
    buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        btn.style.transform = "translateY(-1px)"
        btn.style.transition = "transform 0.2s ease"
      })

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translateY(0)"
      })
    })
  }

  // Initialize button feedback
  addButtonFeedback()

  // Add search functionality
  const searchInput = document.querySelector('input[placeholder="Search"]')
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase()
      filterShipments(searchTerm)
    })
  }

  function filterShipments(searchTerm) {
    shipmentRows.forEach((row) => {
      const text = row.textContent.toLowerCase()
      if (text.includes(searchTerm)) {
        row.style.display = ""
      } else {
        row.style.display = "none"
      }
    })
  }

  // Add status change simulation
  const statusBadges = document.querySelectorAll('span[class*="bg-"]')
  statusBadges.forEach((badge) => {
    if (
      badge.textContent.includes("PENDING") ||
      badge.textContent.includes("IN PROGRESS") ||
      badge.textContent.includes("AT CUSTOMS")
    ) {
      badge.addEventListener("click", () => {
        simulateStatusChange(badge)
      })
      badge.style.cursor = "pointer"
      badge.title = "Click to advance status"
    }
  })

  function simulateStatusChange(badge) {
    const statuses = [
      { text: "PENDING", class: "bg-blue-100 text-blue-800" },
      { text: "IN PROGRESS", class: "bg-green-100 text-green-800" },
      { text: "AT CUSTOMS", class: "bg-yellow-100 text-yellow-800" },
      { text: "COMPLETED", class: "bg-gray-100 text-gray-800" },
    ]

    const currentStatus = badge.textContent.trim()
    const currentIndex = statuses.findIndex((s) => s.text === currentStatus)

    if (currentIndex < statuses.length - 1) {
      const nextStatus = statuses[currentIndex + 1]
      badge.className = `px-2 py-1 rounded-full text-xs ${nextStatus.class}`
      badge.textContent = nextStatus.text
    }
  }

  function setupDocumentPreview() {
    // Setup preview buttons
    const previewButtons = document.querySelectorAll(".preview-doc-btn")
    previewButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault()
        const docType = btn.getAttribute("data-doc")
        showDocumentPreview(docType)
      })
    })

    // Setup modal close
    if (closePreviewModal) {
      closePreviewModal.addEventListener("click", () => {
        hideDocumentPreview()
      })
    }

    // Close modal on background click
    if (documentPreviewModal) {
      documentPreviewModal.addEventListener("click", (e) => {
        if (e.target === documentPreviewModal) {
          hideDocumentPreview()
        }
      })
    }

    // Setup download and print buttons
    const downloadBtn = document.getElementById("downloadDoc")
    const printBtn = document.getElementById("printDoc")

    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        simulateDownload()
      })
    }

    if (printBtn) {
      printBtn.addEventListener("click", () => {
        simulatePrint()
      })
    }
  }

  function showDocumentPreview(docType) {
    const mockDocuments = {
      invoice: {
        title: "Invoice #12345",
        content: `
          <div class="bg-white p-8 border rounded-lg">
            <div class="text-center mb-6">
              <h2 class="text-2xl font-bold text-seagull-blue">SEAGULL LOGISTICS</h2>
              <p class="text-gray-600">Invoice #12345</p>
            </div>
            <div class="grid grid-cols-2 gap-8 mb-6">
              <div>
                <h3 class="font-semibold mb-2">Bill To:</h3>
                <p>Chelan Fresh<br>John Merit<br>Los Angeles, CA 90210</p>
              </div>
              <div>
                <h3 class="font-semibold mb-2">Invoice Details:</h3>
                <p>Date: 05/02/2025<br>Due Date: 06/01/2025<br>Terms: Net 30</p>
              </div>
            </div>
            <table class="w-full border-collapse border border-gray-300">
              <thead class="bg-gray-100">
                <tr>
                  <th class="border border-gray-300 p-2 text-left">Description</th>
                  <th class="border border-gray-300 p-2 text-right">Quantity</th>
                  <th class="border border-gray-300 p-2 text-right">Rate</th>
                  <th class="border border-gray-300 p-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border border-gray-300 p-2">Ocean Freight - Los Angeles</td>
                  <td class="border border-gray-300 p-2 text-right">1</td>
                  <td class="border border-gray-300 p-2 text-right">$2,500.00</td>
                  <td class="border border-gray-300 p-2 text-right">$2,500.00</td>
                </tr>
                <tr>
                  <td class="border border-gray-300 p-2">Documentation Fee</td>
                  <td class="border border-gray-300 p-2 text-right">1</td>
                  <td class="border border-gray-300 p-2 text-right">$150.00</td>
                  <td class="border border-gray-300 p-2 text-right">$150.00</td>
                </tr>
              </tbody>
              <tfoot class="bg-gray-100">
                <tr>
                  <td colspan="3" class="border border-gray-300 p-2 text-right font-semibold">Total:</td>
                  <td class="border border-gray-300 p-2 text-right font-semibold">$2,650.00</td>
                </tr>
              </tfoot>
            </table>
          </div>
        `,
        info: "Invoice_12345.pdf • 245 KB • PDF Document",
      },
      bol: {
        title: "Bill of Lading #12345",
        content: `
          <div class="bg-white p-8 border rounded-lg">
            <div class="text-center mb-6">
              <h2 class="text-2xl font-bold text-seagull-blue">BILL OF LADING</h2>
              <p class="text-gray-600">B/L #12345</p>
            </div>
            <div class="grid grid-cols-2 gap-8 mb-6">
              <div>
                <h3 class="font-semibold mb-2">Shipper:</h3>
                <p>Chelan Fresh<br>123 Export St<br>Los Angeles, CA 90210</p>
              </div>
              <div>
                <h3 class="font-semibold mb-2">Consignee:</h3>
                <p>Pacific Imports<br>456 Import Ave<br>Long Beach, CA 90802</p>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-4 mb-6">
              <div>
                <h4 class="font-medium">Vessel:</h4>
                <p>MV Ocean Star</p>
              </div>
              <div>
                <h4 class="font-medium">Voyage:</h4>
                <p>OS-2025-001</p>
              </div>
              <div>
                <h4 class="font-medium">Port of Loading:</h4>
                <p>Los Angeles</p>
              </div>
            </div>
            <div class="border border-gray-300 rounded p-4">
              <h4 class="font-semibold mb-2">Cargo Description:</h4>
              <p>Fresh Produce - Temperature Controlled<br>
              Container: TCLU1234567<br>
              Weight: 9,911,159 lbs<br>
              Temperature: 32°F</p>
            </div>
          </div>
        `,
        info: "Bill_of_Lading_12345.pdf • 189 KB • PDF Document",
      },
      excel: {
        title: "Shipment Data",
        content: `
          <div class="bg-white p-8 border rounded-lg">
            <div class="text-center mb-6">
              <h2 class="text-xl font-bold text-seagull-blue">SHIPMENT DATA SPREADSHEET</h2>
              <p class="text-gray-600">Shipment_Data.xlsx</p>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full border-collapse border border-gray-300 text-sm">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="border border-gray-300 p-2">Shipment ID</th>
                    <th class="border border-gray-300 p-2">Client</th>
                    <th class="border border-gray-300 p-2">Destination</th>
                    <th class="border border-gray-300 p-2">Weight</th>
                    <th class="border border-gray-300 p-2">Status</th>
                    <th class="border border-gray-300 p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-2">12345</td>
                    <td class="border border-gray-300 p-2">John Merit</td>
                    <td class="border border-gray-300 p-2">Los Angeles</td>
                    <td class="border border-gray-300 p-2">9,911,159</td>
                    <td class="border border-gray-300 p-2">Pending</td>
                    <td class="border border-gray-300 p-2">05/02/2025</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2">12346</td>
                    <td class="border border-gray-300 p-2">Michael Stone</td>
                    <td class="border border-gray-300 p-2">Long Beach</td>
                    <td class="border border-gray-300 p-2">8,500,000</td>
                    <td class="border border-gray-300 p-2">In Progress</td>
                    <td class="border border-gray-300 p-2">05/01/2025</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2">12347</td>
                    <td class="border border-gray-300 p-2">Sarah Johnson</td>
                    <td class="border border-gray-300 p-2">San Francisco</td>
                    <td class="border border-gray-300 p-2">7,200,000</td>
                    <td class="border border-gray-300 p-2">Completed</td>
                    <td class="border border-gray-300 p-2">04/30/2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        `,
        info: "Shipment_Data.xlsx • 67 KB • Excel Spreadsheet",
      },
    }

    const doc = mockDocuments[docType]
    if (doc) {
      documentPreviewContent.innerHTML = doc.content
      docInfo.textContent = doc.info
      documentPreviewModal.classList.remove("hidden")
    }
  }

  function hideDocumentPreview() {
    documentPreviewModal.classList.add("hidden")
  }

  function simulateDownload() {
    const downloadBtn = document.getElementById("downloadDoc")
    const originalText = downloadBtn.textContent
    downloadBtn.textContent = "Downloading..."
    downloadBtn.disabled = true

    setTimeout(() => {
      downloadBtn.textContent = "Downloaded ✓"
      setTimeout(() => {
        downloadBtn.textContent = originalText
        downloadBtn.disabled = false
      }, 2000)
    }, 1500)
  }

  function simulatePrint() {
    const printBtn = document.getElementById("printDoc")
    const originalText = printBtn.textContent
    printBtn.textContent = "Printing..."
    printBtn.disabled = true

    setTimeout(() => {
      printBtn.textContent = "Sent to Printer ✓"
      setTimeout(() => {
        printBtn.textContent = originalText
        printBtn.disabled = false
      }, 2000)
    }, 1500)
  }

  console.log("Seagull Platform initialized successfully")
})
