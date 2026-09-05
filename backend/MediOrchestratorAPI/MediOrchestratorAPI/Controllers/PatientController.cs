using MediOrchestratorAPI.Models.DTOs.Patient;
using MediOrchestratorAPI.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MediOrchestratorAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly ILogger<PatientController> _logger;
        private readonly IPatientService _patientService;

        public PatientController(ILogger<PatientController> logger, IPatientService patientService)
        {
            _logger = logger;
            _patientService = patientService;
        }



        //get all patients

        [HttpGet("patients")]
        public async Task<IActionResult> GetPatients()
        {
            try
            {
                var patients = await _patientService.GetAllPatientsAsync();
                return Ok(patients);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving users.", error = ex.Message });
            }
        }



        // get patient by id


        [HttpGet("patients/{id}")]
        public async Task<IActionResult> GetPatient(int id)
        {
            try
            {
                var patient = await _patientService.GetPatientByIdAsync(id);
                if (patient == null)
                {
                    return NotFound(new { message = "Patient not found." });
                }
                return Ok(patient);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving the patient.", error = ex.Message });
            };
        }




        // create patient


        [HttpPost("Patients")]
        public async Task<IActionResult> CreatePatient([FromBody] PatientDTO request)
        {
            try
            {
                var response = await _patientService.CreatePatientAsync(request);
                return Ok(response);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while creating the patient.", error = ex.Message });
            }

        }


        //update patient
        [HttpPut("patients/{id}")]
        public async Task<IActionResult> UpdatePatient(int id, [FromBody] PatientDTO request)
        {
            try
            {
                var response = await _patientService.UpdatePatientByIdAsync(id, request);
                return Ok(response);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while updating the patient.", error = ex.Message });
            }
        }





        //Delete Patient


        [HttpDelete("patients/{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            try
            {
                await _patientService.DeletePatientByIdAsync(id);
                return Ok(new { message = "Patient deleted successfully." });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while deleting the patient.", error = ex.Message });
            }
        }

    }
}
